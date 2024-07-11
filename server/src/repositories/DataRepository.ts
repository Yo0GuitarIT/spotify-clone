import { IDataRepository } from "../interface/interface";
import { BaseSpotifyRepository } from "./BaseSpotifyRepository";

export class DataRepository
  extends BaseSpotifyRepository
  implements IDataRepository
{
  public getUserProfile(): Promise<any> {
    return this.spotifyWebApi.getMe();
  }

  public getMyRecentlyPlayedTracks(): Promise<any> {
    return this.spotifyWebApi.getMyRecentlyPlayedTracks({ limit: 20 });
  }

  public getNewReleases(): Promise<any> {
    return this.spotifyWebApi.getNewReleases({
      limit: 8,
      offset: 0,
      country: "TW",
    });
  }

  public getMyTopArtists(): Promise<any> {
    return this.spotifyWebApi.getMyTopArtists();
  }

  public getMyTopTracks(): Promise<any> {
    return this.spotifyWebApi.getMyTopTracks();
  }
}
