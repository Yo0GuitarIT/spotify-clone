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

export const validToken = async (token: string) => {
  const response = await fetch("/api/spotify/vaildToken", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Token vaildation failed");
  }
  return response.json();
};
