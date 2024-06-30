import crypto from "crypto";
import { ISpotifyReposity, ISpotifyService } from "../interface/interface";
import { SPOTIFY_SCOPE } from "../config/constants";
import { AuthenticationError } from "../utils/customError";

export class SpotifyService implements ISpotifyService {
  private spotifyRepository: ISpotifyReposity;
  private showDialog = true;
  private tokenRefreshInterval: NodeJS.Timeout | null = null;

  constructor(spotifyRepository: ISpotifyReposity) {
    this.spotifyRepository = spotifyRepository;
  }

  private generateRandomString(length: number): string {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.randomBytes(length);
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  private setupTokenRefresh(expiresIn: number): void {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
    this.tokenRefreshInterval = setInterval(async () => {
      try {
        const accessToken = await this.spotifyRepository.refreshAccessToken();
        this.spotifyRepository.setAccessToken(accessToken);
        console.log("Access token refreshed");
      } catch (error) {
        console.error("Error refreshing access token: ", error);
      }
    }, (expiresIn / 60) * 1000);
  }

  public stopTokenRefresh(): void {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
      this.tokenRefreshInterval = null;
      console.log("Token refresh stopped");
    }
  }

  public createAuthUrl(): string {
    const state = this.generateRandomString(16);
    return this.spotifyRepository
      .getSpotifyWebApi()
      .createAuthorizeURL(SPOTIFY_SCOPE, state, this.showDialog);
  }

  public async handleCallback(code: string): Promise<boolean> {
    try {
      const data = await this.spotifyRepository
        .getSpotifyWebApi()
        .authorizationCodeGrant(code);
      const { access_token, refresh_token, expires_in } = data.body;
      this.spotifyRepository.setAccessToken(access_token);
      this.spotifyRepository.setRefreshToken(refresh_token);

      this.setupTokenRefresh(expires_in);

      return true;
    } catch (error) {
      console.error("Error in handleCallback:", error);
      throw new AuthenticationError("Failed to authenticaticate with Spotify");
    }
  }

  public logout(): void {
    this.stopTokenRefresh();
    this.spotifyRepository.setAccessToken("");
    this.spotifyRepository.setRefreshToken("");
  }

  public getToken(): string | undefined {
    return this.spotifyRepository.getAccessToken();
  }

  async getCurrentTrack(): Promise<any> {
    return this.spotifyRepository.getCurrentTrack();
  }
}
