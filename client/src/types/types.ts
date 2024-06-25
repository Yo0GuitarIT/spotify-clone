export interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
