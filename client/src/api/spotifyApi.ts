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
