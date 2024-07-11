import { IDataRepository, IDataService } from "../interface/interface";

export class DataService implements IDataService {
  constructor(private spotifyRepository: IDataRepository) {}

  async getUserProfile<T = any>(): Promise<T> {
    return this.spotifyRepository.getUserProfile();
  }

  async getMyRecentlyPlayedTracks<T = any>(): Promise<T> {
    return this.spotifyRepository.getMyRecentlyPlayedTracks();
  }

  async getMyTopArtists<T = any>(): Promise<T> {
    return this.spotifyRepository.getMyTopArtists();
  }

  async getMyTopTracks<T = any>(): Promise<T> {
    return this.spotifyRepository.getMyTopTracks();
  }
}