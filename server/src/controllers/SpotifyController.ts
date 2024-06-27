import { Request, Response } from "express";
import { SpotifyService } from "../services/SpotifyService";

export class SpotifyController {
  private spotifyService: SpotifyService;

  constructor(spotifyService: SpotifyService) {
    this.spotifyService = spotifyService;
  }

  login(req: Request, res: Response): void {
    try {
      const authUrl = this.spotifyService.createAuthUrl();
      res.json({ success: true, url: authUrl });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error during login process",
      });
    }
  }

  async callback(req: Request, res: Response): Promise<void> {
    const error = req.query.error as string | undefined;
    const code = req.query.code as string | undefined;

    if (error) {
      res.status(400).send(`Callback Error: ${error}`);
    }

    if (!code) {
      res.status(400).send('Miss "code" query parameter');
    }

    try {
      await this.spotifyService.handleCallback(code as string);
      res.json({
        success: true,
        message:
          "Login successful! You can now use the /search and /play endpoints.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error during login process",
      });
    }
  }
}
