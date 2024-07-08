import { useEffect, useState } from "react";
import { getAccessToken } from "../api/spotifyApi";

export const useSpotifyToken = () => {
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        setIsLoading(true);
        const data = await getAccessToken();
        if (data?.data) {
          setToken(data.data);
        } else {
          throw new Error("Failed to get access token");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  return { token, isLoading, error };
};
