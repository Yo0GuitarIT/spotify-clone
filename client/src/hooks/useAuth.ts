import { useState, useEffect } from "react";
import { validToken, loginSpotify } from "../api/spotifyApi";
import { ApiResponse } from "../types/types";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      try {
        const response = await validToken(token);
        setIsAuthenticated(response.valid);
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
    localStorage.setItem("spotify_access_token", accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("spotify_access_token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, handleCallback, logout };
};
