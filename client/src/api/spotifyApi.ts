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
