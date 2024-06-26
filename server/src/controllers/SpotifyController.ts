import { Request, Response } from "express";
import crypto from "crypto";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID, CLIENT_SERCET, REDIRECT_URI } from "../config/constants";

export class SpotifyController {
  private clientId = CLIENT_ID;
  private clientSecret = CLIENT_SERCET;
  private redirectUri = REDIRECT_URI;
  private scope = ["user-read-private", " user-read-email"];
  private spotifyApi: SpotifyWebApi;

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUri: this.redirectUri,
    });
  }
  private generateRandomString(length: number): string {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.randomBytes(length);
    const randomString = values.reduce(
      (acc, x) => acc + possible[x % possible.length],
      ""
    );
    return randomString;
  }

  private setupTokenRefresh(expiresIn: number): void {
    setInterval(async () => {
      try {
        const data = await this.spotifyApi.refreshAccessToken();
        const { access_token } = data.body;
        this.spotifyApi.setAccessToken(access_token);
        console.log("Access token refreshed");
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    }, (expiresIn / 2) * 1000);
  }

  login(req: Request, res: Response): void {
    try {
      const state = this.generateRandomString(16);
      const authUrl = this.spotifyApi.createAuthorizeURL(this.scope, state);

      res.json({
        success: true,
        url: authUrl,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error during login proocess",
      });
    }
  }

  async callback(req: Request, res: Response): Promise<void> {
    const error = req.query.error as string | undefined;
    const code = req.query.code as string | undefined;

    if (error) {
      res.status(400).send(`Callback Error: ${error}`);
      return;
    }

    if (!code) {
      res.status(400).send('Missing "code" query parameter');
      return;
    }

    try {
      const data = await this.spotifyApi.authorizationCodeGrant(code);
      const accessToken = data.body.access_token;
      const refreshToken = data.body.refresh_token;
      const expiresIn = data.body.expires_in;

      this.spotifyApi.setAccessToken(accessToken);
      this.spotifyApi.setRefreshToken(refreshToken);

      console.log("The access token is " + accessToken);
      console.log("The refresh token is " + refreshToken);

      this.setupTokenRefresh(expiresIn);

      res.json({
        success: true,
        message:
          "Login successful! You can now use the /search and /play endpoints.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error during login proocess",
      });
    }
  }
}
