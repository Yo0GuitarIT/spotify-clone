import { IAuthRepository } from "../interface/interface";
import { BaseSpotifyRepository } from "./BaseSpotifyRepository";

export class AuthRepository
  extends BaseSpotifyRepository
  implements IAuthRepository
{
  public getAccessToken(): string | undefined {
    return this.spotifyWebApi.getAccessToken();
  }

  public getRefreshToken(): string | undefined {
    return this.spotifyWebApi.getRefreshToken();
  }

  public setAccessToken(token: string): void {
    this.spotifyWebApi.setAccessToken(token);
  }

  public setRefreshToken(token: string): void {
    this.spotifyWebApi.setRefreshToken(token);
  }

  public async refreshAccessToken(): Promise<string> {
    const data = await this.spotifyWebApi.refreshAccessToken();
    return data.body.access_token;
  }
}
