import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../config/constants";
import { ISpotifyReposity } from "../interface/interface";

export class SpotifyRepository implements ISpotifyReposity {
  private spotifyWebApi: SpotifyWebApi;

  constructor() {
    this.spotifyWebApi = new SpotifyWebApi({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
    });
  }

  getSpotifyWebApi(): SpotifyWebApi {
    return this.spotifyWebApi;
  }

  getAccessToken(): string | undefined {
    return this.spotifyWebApi.getAccessToken();
  }

  getRefreshToken(): string | undefined {
    return this.spotifyWebApi.getRefreshToken();
  }

  setAccessToken(token: string) {
    return this.spotifyWebApi.setAccessToken(token);
  }

  setRefreshToken(token: string) {
    return this.spotifyWebApi.setRefreshToken(token);
  }

  async refreshAccessToken(): Promise<string> {
    const data = await this.spotifyWebApi.refreshAccessToken();
    return data.body.access_token;
  }

  getCurrentTrack(): Promise<any>{
    return this.spotifyWebApi.getMyCurrentPlayingTrack();
    //   const accessToken = this.getAccessToken();

    //   if (!accessToken) {
    //     throw new Error("Access token not available");
    //   }

    //   const response = await fetch(
    //     "https://api.spotify.com/v1/me/player/currently-playing",
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   if (response.status === 204) {
    //     return null; // No track currently playing
    //   }
    //   const data = await response.json();
    //   return data;
  }
}
