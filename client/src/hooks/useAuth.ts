import { useState, useEffect, useCallback } from "react";
import {
  validLoginState,
  loginSpotify,
  logoutSpotify,
} from "../api/spotifyApi";
import { ApiResponse } from "../types/types";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const loginState = localStorage.getItem("login_success");
    if (loginState) {
      try {
        const response = await validLoginState(loginState);
        setIsAuthenticated(response.success);
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const login = async (): Promise<void> => {
    try {
      const data: ApiResponse = await loginSpotify();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Login failed or URL not provided.");
      }
    } catch (error) {
      console.error("Error during Spotify login:", error);
    }
  };

  const handleCallback = useCallback((accessToken: string) => {
    localStorage.setItem("login_success", accessToken);
    setIsAuthenticated(true);
  }, []);

  const logout = async () => {
    try {
      const response = await logoutSpotify();
      if (response) {
        localStorage.removeItem("login_success");
        setIsAuthenticated(false);
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("logout fail");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    login,
    handleCallback,
    logout,
    checkAuth,
  };
};
