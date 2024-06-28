import { useState, useEffect } from "react";
import { validToken } from "./api/spotifyApi";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("spotify_access_token");
      if (token) {
        try {
          const result = await validToken(token);
          if (result.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.setItem("spotify_access_token", result.newToken);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Token validation error: ", error);
          setIsAuthenticated(false);
          //localStorage.removeItem("spotify_access_token");
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);
  return { isAuthenticated, isLoading };
}
