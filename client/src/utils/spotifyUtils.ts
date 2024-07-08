export const connectToSpotify = (token: string, deviceId: string) => {
  fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play: false,
    }),
  }).catch((error) => console.error("Error connecting to player:", error));
};
