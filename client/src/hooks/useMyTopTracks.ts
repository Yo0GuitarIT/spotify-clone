import { useState, useEffect } from "react";
import { getMyTopTracks } from "../services/dataApi";

export const useMyTopTracks = () => {
  const [myTopTracks, setMyTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTopTracks = async () => {
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
    fetchMyTopTracks();
  }, []);

  return { myTopTracks, isLoading, error };
};
