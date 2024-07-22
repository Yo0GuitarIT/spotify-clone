import { useState, useEffect } from "react";
import { getMyTopTracks } from "../services/dataApi";
import { DataResponse, Track } from "../types/types";

export const useMyTopTracks = () => {
  const [myTopTracks, setMyTopTracks] = useState(<Track[]>[]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTopTracks = async () => {
      try {
        setIsLoading(true);
        const response: DataResponse<Track[]> = await getMyTopTracks();
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
