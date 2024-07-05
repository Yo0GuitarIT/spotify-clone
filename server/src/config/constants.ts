import "dotenv/config";

export const { PORT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

export const SPOTIFY_SCOPE = [
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-top-read",
  "app-remote-control",
  "streaming",
];
