export interface ISpotifyReposity {
  getSpotifyWebApi(): any;
  getAccessToken(): string | undefined;
  getRefreshToken(): string | undefined;
  setAccessToken(token: string): string | void;
  setRefreshToken(token: string): string | void;
  refreshAccessToken(): Promise<string>;

  getCurrentTrack(): Promise<any>;
}

export interface ISpotifyService {
  createAuthUrl(): string;
  handleCallback(code: string): Promise<boolean>;
  getToken(): string | undefined;

  getCurrentTrack(): Promise<any>;
}
