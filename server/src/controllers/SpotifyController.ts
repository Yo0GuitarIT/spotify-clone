import { NextFunction, Request, Response } from "express";
import { ISpotifyService } from "../interface/interface";
import {
  ValidationError,
  AuthenticationError,
  NotFoundError,
} from "../utils/customError";
import { AuthorizationResponse, LoginStateResponse } from "../types/types";

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export class SpotifyController {
  constructor(private spotifyService: ISpotifyService) {}

  public login = asyncHandler(
    async (req: Request, res: Response<AuthorizationResponse>) => {
      const authUrl = this.spotifyService.createAuthUrl();
      res.json({ success: true, url: authUrl });
    }
  );

  public logout = asyncHandler(async (req: Request, res: Response) => {
    this.spotifyService.logout();
    res.json({ success: true, message: "Logged out successfully" });
  });

  public callback = asyncHandler(async (req: Request, res: Response) => {
    const { error, code } = req.query;

    if (error) {
      throw new AuthenticationError(`Callback Error: ${error}`);
    }
    if (!code || typeof code !== "string") {
      throw new ValidationError('Missing "code" query parameter');
    }

    try {
      const success = await this.spotifyService.handleCallback(code);
      const frontendUrl = new URL("http://localhost:5173/auth-callback");
      frontendUrl.searchParams.append(
        "login_success",
        success ? "true" : "false"
      );

      res.redirect(frontendUrl.toString());
    } catch (err) {
      console.error("Error in Spotify callback:", err);
      const frontendUrl = new URL("http://localhost:5173/auth-callback");
      frontendUrl.searchParams.append("login_success", "false");
      frontendUrl.searchParams.append(
        "error",
        "An error occurred during authentication"
      );
      res.redirect(frontendUrl.toString());
    }
  });

  public validLoginState = asyncHandler(
    async (req: Request, res: Response<LoginStateResponse>) => {
      const { loginState } = req.body;

      if (!loginState) {
        throw new ValidationError("No login state provided");
      }

      if (loginState === "true") {
        res.json({ success: true, valid: true });
      } else {
        res.json({ success: true, valid: false });
      }
    }
  );

  public getUserProfile= asyncHandler(async (req: Request, res: Response) => {
    const data = await this.spotifyService.getUserProfile();
    if (data === null) {
      throw new NotFoundError("No track currently playing");
    } else {
      res.json({
        data
      });
    }
  });
}
