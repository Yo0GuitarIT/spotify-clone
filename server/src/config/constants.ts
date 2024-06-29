import "dotenv/config";

export const { PORT, SECRET_KEY, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } =
  process.env;

export const SPOTIFY_SCOPE = [
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-read-currently-playing",
];
