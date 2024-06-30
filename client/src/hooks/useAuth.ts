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
        throw new Error("Login faild: No redirect URL Provided");
      }
    } catch (error) {
      console.error("Error during Spotify login:", error);
      // todo Implement user-facing error handling
    }
  }, []);

  const handleCallback = useCallback((accessToken: string) => {
    localStorage.setItem("login_success", accessToken);
    setIsAuthenticated(true);
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      await logoutSpotify();
      localStorage.removeItem("login_success");
      setIsAuthenticated(false);
      window.location.href = "/login";
    } catch (error) {
      console.log("logout fail");
      // todo Implement user-facing error handling
    }
  }, []);
  return {
    isAuthenticated,
    isLoading,
    initateLogin,
    handleCallback,
    logoutUser,
    verifyAuthStatus,
  };
};
