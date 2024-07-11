import SpotifyWebApi from "spotify-web-api-node";

export interface IBaseSpotifyRepository {
  getSpotifyWebApi(): SpotifyWebApi;
}

export interface IAuthRepository extends IBaseSpotifyRepository {
  getAccessToken(): string | undefined;
  getRefreshToken(): string | undefined;
  setAccessToken(token: string): void;
  setRefreshToken(token: string): void;
  refreshAccessToken(): Promise<string>;
}

export interface IDataRepository extends IBaseSpotifyRepository {
  getUserProfile(): Promise<any>;
  getMyRecentlyPlayedTracks(): Promise<any>;
  getMyTopArtists(): Promise<any>;
  getMyTopTracks(): Promise<any>;
}

export interface IAuthService {
  createAuthUrl(): string;
  handleCallback(code: string): Promise<boolean>;
  logout(): void;
  getAccessToken(): string | undefined;
}

export interface IDataService {
  getUserProfile(): Promise<any>;
  getMyRecentlyPlayedTracks(): Promise<any>;
  getMyTopArtists(): Promise<any>;
  getMyTopTracks(): Promise<any>;
}
