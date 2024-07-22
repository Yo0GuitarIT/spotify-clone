import { useState, useEffect } from "react";
import { getMyRecentlyPlayedTracks } from "../services/dataApi";

interface Track {
  artistName: string;
  songName: string;
  albumCoverUrl: string;
}

export const useUserRecentltPlayedTrack = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchUserRecentlyPlayedTracks = async () => {
      const response = await getMyRecentlyPlayedTracks();
      if (response.success && Array.isArray(response.data)) {
        setTracks(response.data);
      }
    };

    fetchUserRecentlyPlayedTracks();
  }, []);

  return { tracks };
};
