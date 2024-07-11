import "dotenv/config";

export const PORT: string = process.env.PORT as string;
export const CLIENT_ID: string = process.env.CLIENT_ID as string;
export const CLIENT_SECRET: string = process.env.CLIENT_SECRET as string;
export const REDIRECT_URI: string = process.env.REDIRECT_URI as string;
export const FRONTEND_CALLBACK_URL: string = process.env.FRONTEND_CALLBACK_URL as string;

export const SPOTIFY_SCOPE = [
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-top-read",
  "app-remote-control",
  "streaming",
];
