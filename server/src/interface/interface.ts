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
  handleCallback(code: string): Promise<boolean>;
  createAuthUrl(): string;
  logout(): void;
  getAccessToken(): string | undefined;
}

export interface IDataService {
  getUserProfile<T = any>(): Promise<T>;
  getMyRecentlyPlayedTracks<T = any>(): Promise<T>;
  getMyTopArtists<T = any>(): Promise<T>;
  getMyTopTracks<T = any>(): Promise<T>;
}
