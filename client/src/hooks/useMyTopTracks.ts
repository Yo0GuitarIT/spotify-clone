import { useState, useEffect } from "react";
import { getMyTopTracks } from "../api/spotifyApi";

export const useMyTopTracks = () => {
  const [MyTopTracks, setMyTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturePlaylists = async () => {
      try {
        setIsLoading(true);
        const response = await getMyTopTracks();
        if (response.success) {
          setMyTopTracks(response.data);
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

  return { MyTopTracks, isLoading, error };
};
