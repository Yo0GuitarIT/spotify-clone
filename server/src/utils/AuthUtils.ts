import crypto from "crypto";

export function generateRandomString(length: number): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.randomBytes(length);
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
