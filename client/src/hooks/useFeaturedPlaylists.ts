import { useState, useEffect } from "react";
import { getFeaturedPlaylists } from "../api/spotifyApi";

export const useFeaturedPlaylists = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturePlaylists = async () => {
      try {
        setIsLoading(true);
        const response = await getFeaturedPlaylists();
        if (response.success) {
          setFeaturedPlaylists(response.data);
        } else {
          setError("Fail to fetch my artists");
        }
      } catch (err) {
        setError("An error occurred while fetching my artists");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturePlaylists();
  }, []);

  return { featuredPlaylists, isLoading, error };
};
