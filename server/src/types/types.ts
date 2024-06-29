export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AuthorizationResponse {
  success: boolean;
  url: string;
}

export interface LoginStateResponse {
  success: boolean;
  valid: boolean;
}
