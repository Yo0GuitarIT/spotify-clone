import { NextFunction, Request, Response } from "express";
import { ISpotifyService } from "../interface/interface";
import { CustomError } from "../utils/customError";
import { AuthorizationResponse, TokenValidationResponse } from "../types/types";

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export class SpotifyController {
  constructor(private spotifyService: ISpotifyService) {}

  login = asyncHandler(
    async (req: Request, res: Response<AuthorizationResponse>) => {
      const authUrl = this.spotifyService.createAuthUrl();
      res.json({ success: true, url: authUrl });
    }
  );

  callback = asyncHandler(async (req: Request, res: Response) => {
    const { error, code } = req.query;

    if (error) {
      throw new CustomError(`Callback Error: ${error}`, 400);
    }
    if (!code || typeof code !== "string") {
      throw new CustomError('Missing "code" query parameter', 400);
    }

    const accessToken = await this.spotifyService.handleCallback(code);
    const frontendUrl = new URL("http://localhost:5173/auth-callback");
    frontendUrl.searchParams.append("access_token", accessToken);
    res.redirect(frontendUrl.toString());
  });

  validToken = asyncHandler(
    async (req: Request, res: Response<TokenValidationResponse>) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new CustomError("No token provided", 401);
      }

      const storedToken = this.spotifyService.getToken();
      if (token === storedToken) {
        res.json({ success: true, valid: true });
      } else {
        res.json({ success: true, valid: false, newToken: storedToken });
      }
    }
  );
}
