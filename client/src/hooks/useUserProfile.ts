import { useState, useEffect } from "react";
import { getUserProfile } from "../api/spotifyApi";

interface UserProfileImage {
  url: string;
  height: number;
  width: number;
}



export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfileImage | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile();
      if (data && data.imageUrl) {
        setProfile(data.imageUrl);
      } else {
        throw new Error("Invalid profile data");
      }
    };

    fetchUserProfile();
  }, []);

  return { profile };
};
