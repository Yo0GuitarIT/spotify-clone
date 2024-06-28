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
      const accessToken = await this.spotifyService.handleCallback(
        code as string
      );

      const frontendUrl = new URL("http://localhost:5173/auth-callback");
      frontendUrl.searchParams.append("access_token", accessToken);

      res.redirect(frontendUrl.toString());
    } catch (error) {
      console.error("Error during login process:", error);
      res.redirect("http://localhost:5173/auth-error");
    }
  }

  validToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    const storedToken = this.spotifyService.getToken();

    // todo get refresh token if the token is time over
    if (token === storedToken) {
      res.json({
        success: true,
        valid: true,
      });
    } else {
      res.json({
        success: true,
        valid: false,
      });
    }
  }
}
