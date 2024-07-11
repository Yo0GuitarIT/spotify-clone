import { IAuthRepository, IAuthService } from "../interface/interface";
import { SPOTIFY_SCOPE } from "../config/constants";
import { AuthenticationError } from "../utils/customError";
import { generateRandomString } from "../utils/AuthUtils";

export class AuthService implements IAuthService {
  private showDialog = true;
  private tokenRefreshInterval: NodeJS.Timeout | null = null;

  constructor(private spotifyRepository: IAuthRepository) {}

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
    }, (expiresIn / 2) * 1000);
  }

  private stopTokenRefresh(): void {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
      this.tokenRefreshInterval = null;
      console.log("Token refresh stopped");
    }
  }

  public createAuthUrl(): string {
    const state = generateRandomString(16);
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
      throw new AuthenticationError("Failed to authenticate with Spotify");
    }
  }

  public logout(): void {
    this.stopTokenRefresh();
    this.spotifyRepository.setAccessToken("");
    this.spotifyRepository.setRefreshToken("");
  }

  public getAccessToken(): string | undefined {
    return this.spotifyRepository.getAccessToken();
  }
}
