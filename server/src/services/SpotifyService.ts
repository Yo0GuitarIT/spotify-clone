import crypto from "crypto";
import { SpotifyRepository } from "../repositories/SpotifyResposity";

export class SpotifyService {
  private spotifyRepository: SpotifyRepository;
  private scope = ["user-read-private", "user-read-email"];

  constructor(spotifyRepository: SpotifyRepository) {
    this.spotifyRepository = spotifyRepository;
  }

  private generateRandomString(length: number): string {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.randomBytes(length);
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  private setupTokenRefresh(expiresIn: number): void {
    setInterval(async () => {
      try {
        const accessToken = await this.spotifyRepository.refreshAccessToken();
        this.spotifyRepository.setAccessToken(accessToken);
        console.log("Access token refreshed");
      } catch (error) {
        console.error("Error refreshing access token: ", error);
      }
    }, (expiresIn / 2) * 1000);
  }
  createAuthUrl(): string {
    const state = this.generateRandomString(16);
    const AuthUrl = this.spotifyRepository
      .getSpotifyWebApi()
      .createAuthorizeURL(this.scope, state);
    return AuthUrl;
  }

  async handleCallback(code: string): Promise<void> {
    const data = await this.spotifyRepository
      .getSpotifyWebApi()
      .authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = data.body;

    this.spotifyRepository.setAccessToken(access_token);
    this.spotifyRepository.setRefreshToken(refresh_token);

    this.setupTokenRefresh(expires_in);
  }
}
