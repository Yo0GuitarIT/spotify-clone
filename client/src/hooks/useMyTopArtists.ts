import { useState, useEffect } from "react";
import { getMyTopArtists } from "../services/dataApi";
import { DataResponse, Artist } from "../types/types";

export const useMyTopArtitsts = () => {
  const [myTopArtists, setMyTopArtitsts] = useState(<Artist[]>[]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTopArtists = async () => {
      try {
        setIsLoading(true);
        const response: DataResponse<Artist[]> = await getMyTopArtists();
        if (response.success) {
          setMyTopArtitsts(response.data);
        } else {
          setError("Fail to fetch my artists");
        }
      } catch (err) {
        setError("An error occurred while fetching my artists");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyTopArtists();
  }, []);

  return { myTopArtists, isLoading, error };
};
