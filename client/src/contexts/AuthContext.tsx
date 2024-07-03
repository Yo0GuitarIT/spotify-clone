import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  validLoginState,
  loginSpotify,
  logoutSpotify,
} from "../api/spotifyApi";
import { ApiResponse } from "../types/types";

interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  initateLogin: () => Promise<void>;
  handleCallback: (accessToken: string) => void;
  logoutUser: () => Promise<void>;
  verifyAuthStatus: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyAuthStatus = useCallback(async () => {
    const storedLoginState = localStorage.getItem("login_success");
    if (!storedLoginState) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await validLoginState(storedLoginState);
      setIsAuthenticated(response.success);
    } catch (error) {
      console.error("Token validation failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyAuthStatus();
  }, [verifyAuthStatus]);

  const initateLogin = useCallback(async () => {
    try {
      const loginResponse: ApiResponse = await loginSpotify();
      if (loginResponse.success && loginResponse.url) {
        window.location.href = loginResponse.url;
      } else {
        throw new Error("Login failed: No redirect URL Provided");
      }
    } catch (error) {
      console.error("Error during Spotify login:", error);
      // TODO: Implement user-facing error handling
    }
  }, []);

  const handleCallback = useCallback((accessToken: string) => {
    localStorage.setItem("login_success", accessToken);
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      await logoutSpotify();
      localStorage.removeItem("login_success");
      setIsAuthenticated(false);
      window.location.href = "/login";
    } catch (error) {
      console.log("logout fail");
      // TODO: Implement user-facing error handling
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        initateLogin,
        handleCallback,
        logoutUser,
        verifyAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
