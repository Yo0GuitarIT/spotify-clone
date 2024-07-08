export const loginSpotify = async () => {
  const response = await fetch("/api/spotify/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login Spotify failed");
  }

  const data = await response.json();
  return data;
};

export const logoutSpotify = async () => {
  const response = await fetch("/api/spotify/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login Spotify failed");
  }
  const data = await response.json();
  return data;
};

export const validLoginState = async (loginState: string) => {
  try {
    const response = await fetch("/api/spotify/validLoginState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loginState }),
    });

    if (!response.ok) {
      throw new Error(`Login state validation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error validating login state:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
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

export const getUserRecentlyPlayedTracks = async () => {
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

export const getNewReleases = async () => {
  try {
    const response = await fetch("api/spotify/getNewReleases", {
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

export const getMyTopArtists = async () => {
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

export const getMyTopTracks = async () => {
  try {
    const response = await fetch("api/spotify/getMyTopTracks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Get FeaturePlaylists Failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error get Playlists", error);
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const response = await fetch("api/spotify/getAccessToken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Get AccessToken Failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error get Accesstoken", error);
    throw error;
  } 
}
