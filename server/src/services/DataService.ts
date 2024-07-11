import { IDataRepository, IDataService } from "../interface/interface";

export class DataService implements IDataService {
  constructor(private spotifyRepository: IDataRepository) {}

  async getUserProfile(): Promise<any> {
    return this.spotifyRepository.getUserProfile();
  }

  async getMyRecentlyPlayedTracks(): Promise<any> {
    return this.spotifyRepository.getMyRecentlyPlayedTracks();
  }

  async getMyTopArtists(): Promise<any> {
    return this.spotifyRepository.getMyTopArtists();
  }

  async getMyTopTracks(): Promise<any> {
    return this.spotifyRepository.getMyTopTracks();
  }
}