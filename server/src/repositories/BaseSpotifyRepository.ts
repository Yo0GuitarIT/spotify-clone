import SpotifyWebApi from "spotify-web-api-node";

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../config/constants";

export class SpotifyWebApiSingleton {
  private static instance: SpotifyWebApi;
  private constructor() {}

  public static getInstance(): SpotifyWebApi {
    if (!SpotifyWebApiSingleton.instance) {
      SpotifyWebApiSingleton.instance = new SpotifyWebApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI,
      });
    }
    return SpotifyWebApiSingleton.instance;
  }
}

export class BaseSpotifyRepository {
  protected spotifyWebApi: SpotifyWebApi;

  constructor() {
    this.spotifyWebApi = SpotifyWebApiSingleton.getInstance();
  }

  public getSpotifyWebApi(): SpotifyWebApi {
    return this.spotifyWebApi;
  }
}
