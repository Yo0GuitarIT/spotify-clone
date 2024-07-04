import { useState, useEffect } from "react";
import { getNewReleases } from "../api/spotifyApi";
// import { NewRelease } from "../types/types";

export const useNewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setIsLoading(true);
        const response = await getNewReleases();
        if (response.success) {
          setNewReleases(response.data);
        } else {
          setError("Failed to fetch new releases");
        }
      } catch (err) {
        setError("An error occurred while fetching new releases");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  return { newReleases, isLoading, error };
};
