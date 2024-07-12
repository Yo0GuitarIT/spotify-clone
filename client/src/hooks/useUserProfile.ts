import { useState, useEffect } from "react";
import { getUserProfile } from "../services/spotifyApi";
import { UserProfileType } from "../types/types";

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile();
        if (data) {
          setProfile({ imageUrl: data.data.imageUrl });
        } else {
          throw new Error("Invalid profile data");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  return { profile, isLoading, error };
};
