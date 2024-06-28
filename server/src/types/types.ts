export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AuthorizationResponse {
  success: boolean;
  url?: string;
  message?: string;
}

export interface TokenValidationResponse {
  success: boolean;
  valid: boolean;
  newToken?: string;
}
