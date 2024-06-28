import { NextFunction, Request, Response } from "express";
import { SpotifyService } from "../services/SpotifyService";
import { CustomError } from "../utils/customError";

export class SpotifyController {
  private spotifyService: SpotifyService;

  constructor(spotifyService: SpotifyService) {
    this.spotifyService = spotifyService;
  }

  login(req: Request, res: Response, next: NextFunction): void {
    try {
      const authUrl = this.spotifyService.createAuthUrl();
      res.json({ success: true, url: authUrl });
    } catch (error) {
      next(new CustomError("Error during login process", 500));
    }
  }

  async callback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const error = req.query.error as string | undefined;
    const code = req.query.code as string | undefined;

    if (error) {
      return next(new CustomError(`Callback Error: ${error}`, 400));
    }

    if (!code) {
      return next(new CustomError('Missing "code" query parameter', 400));
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
      next(new CustomError("Error during login process", 500));
    }
  }

  validToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new CustomError("No token provided", 401));
    }

    try {
      const storedToken = this.spotifyService.getToken();

      if (token === storedToken) {
        res.json({
          success: true,
          valid: true,
        });
      } else {
        res.json({
          success: true,
          valid: false,
          newToken: storedToken,
        });
      }
    } catch (error) {
      next(new CustomError("Server error", 500));
    }
  }
}
