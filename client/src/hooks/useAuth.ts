import { useState, useEffect } from "react";
import { validLoginState, loginSpotify } from "../api/spotifyApi";
import { ApiResponse } from "../types/types";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const loginState = localStorage.getItem("login_success");
    if (loginState) {
      try {
        const response = await validLoginState(loginState);
        setIsAuthenticated(response.success);
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  };

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

  const handleCallback = (accessToken: string) => {
    localStorage.setItem("login_success", accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("login_success");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { isAuthenticated, isLoading, login, handleCallback, logout };
};
