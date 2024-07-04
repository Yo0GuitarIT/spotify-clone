export interface ApiResponse {
  success: boolean;
  message: string;
  url?: string;
}

export interface IconProps {
  className?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  initateLogin: () => Promise<void>;
  handleCallback: (accessToken: string) => void;
  logoutUser: () => Promise<void>;
  verifyAuthStatus: () => Promise<void>;
}