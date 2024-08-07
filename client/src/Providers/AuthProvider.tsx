import  { useState, useEffect, useCallback, ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  validLoginState,
  login,
  logout,
} from "../services/authApi";
import { DataResponse, AuthContextType } from "../types/types";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children } : AuthProviderProps)  {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const verifyAuthStatus = useCallback(async (): Promise<void> => {
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

  const initiateLogin = useCallback(async (): Promise<void> => {
    try {
      const loginResponse: DataResponse<string> = await login();
      if (loginResponse.success && loginResponse.data) {
        window.location.href = loginResponse.data;
      } else {
        throw new Error("Login failed: No redirect URL Provided");
      }
    } catch (error) {
      console.error("Error during Spotify login:", error);
      // TODO: Implement user-facing error handling
    }
  }, []);

  const handleCallback = useCallback((accessToken: string): void => {
    localStorage.setItem("login_success", accessToken);
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const logoutUser = useCallback(async (): Promise<void> => {
    try {
      await logout();
      localStorage.removeItem("login_success");
      setIsAuthenticated(false);
      window.location.href = "/login";
    } catch (error) {
      console.log("logout fail");
      // TODO: Implement user-facing error handling
    }
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    initiateLogin,
    handleCallback,
    logoutUser,
    verifyAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
