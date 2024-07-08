export interface ISpotifyReposity {
  getSpotifyWebApi(): any;
  getAccessToken(): string | undefined;
  getRefreshToken(): string | undefined;
  setAccessToken(token: string): string | void;
  setRefreshToken(token: string): string | void;
  refreshAccessToken(): Promise<string>;

  getUserProfile(): Promise<any>;
  getMyRecentlyPlayedTracks(): Promise<any>;
  getNewReleases(): Promise<any>;
  getMyTopArtists(): Promise<any>;
  getMyTopTracks(): Promise<any>;
}

export interface ISpotifyService {
  createAuthUrl(): string;
  handleCallback(code: string): Promise<boolean>;
  getAccessToken(): string | undefined;
  logout(): void;

  getUserProfile(): Promise<any>;
  getMyRecentlyPlayedTracks(): Promise<any>;
  getNewReleases(): Promise<any>;
  getMyTopArtists(): Promise<any>;
  getMyTopTracks(): Promise<any>;
}
