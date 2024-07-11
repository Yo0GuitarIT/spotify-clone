import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../interface/interface";
import { FRONTEND_CALLBACK_URL } from "../config/constants";
import {
  ValidationError,
  AuthenticationError,
} from "../utils/customError";

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export class AuthController {
  constructor(private spotifyService: IAuthService) {}

  public login = asyncHandler(
    async (req: Request, res: Response) => {
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
      const frontendUrl = new URL(FRONTEND_CALLBACK_URL)  ;
      frontendUrl.searchParams.append(
        "login_success",
        success ? "true" : "false"
      );

      res.redirect(frontendUrl.toString());
    } catch (err) {
      console.error("Error in Spotify callback:", err);
      const frontendUrl = new URL(FRONTEND_CALLBACK_URL);
      frontendUrl.searchParams.append("login_success", "false");
      frontendUrl.searchParams.append(
        "error",
        "An error occurred during authentication"
      );
      res.redirect(frontendUrl.toString());
    }
  });

  public validLoginState = asyncHandler(
    async (req: Request, res: Response) => {
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

  public getAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const data = this.spotifyService.getAccessToken();
    res.json({
      success: true,
      data: data,
    });
  });
}