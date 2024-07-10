import { useState, useEffect } from "react";
import { getUserRecentlyPlayedTracks } from "../services/spotifyApi";

interface Track {
  artist: string;
  song: string;
  albumCoverUrl: string;
}

export const useUserRecentltPlayedTrack = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchUserRecentlyPlayedTracks = async () => {
      const response = await getUserRecentlyPlayedTracks();
      if (response.success && Array.isArray(response.data)) {
        setTracks(response.data);
      }
    };

    fetchUserRecentlyPlayedTracks();
  }, []);

  return { tracks };
};
