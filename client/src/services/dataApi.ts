import { DataResponse, UserProfileType, Track, Artist } from "../types/types";

export const getUserProfile = async (): Promise<
  DataResponse<UserProfileType>
> => {
  try {
    const response = await fetch("api/spotify/getUserProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Get User Profile Failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error get user Proile:", error);
    throw error;
  }
};

export const getMyRecentlyPlayedTracks = async (): Promise<
  DataResponse<Track[]>
> => {
  try {
    const response = await fetch("api/spotify/getMyRecentlyPlayedTracks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Get User Profile Failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error get user Proile:", error);
    throw error;
  }
};

export const getMyTopArtists = async (): Promise<DataResponse<Artist[]>> => {
  try {
    const response = await fetch("api/spotify/getMyTopArtists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Get New Releases Failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error get New Releases", error);
    throw error;
  }
};

export const getMyTopTracks = async (): Promise<DataResponse<Track[]>> => {
  try {
    const response = await fetch("api/spotify/getMyTopTracks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Get My Top Tracks  Failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error get Playlists", error);
    throw error;
  }
};
