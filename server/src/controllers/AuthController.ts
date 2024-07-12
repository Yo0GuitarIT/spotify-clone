import { Request, Response } from "express";
import { IAuthService } from "../interface/interface";
import { FRONTEND_CALLBACK_URL } from "../config/constants";
import { ValidationError, AuthenticationError } from "../utils/customError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  BaseResponse,
  DataResponse,
  ValidLoginStateResponse,
} from "../types/types";

export class AuthController {
  constructor(private spotifyService: IAuthService) {}

  public login = asyncHandler(async (req: Request, res: Response) => {
    const authUrl = this.spotifyService.createAuthUrl();
    const response: DataResponse<string> = {
      success: true,
      data: authUrl,
      message: "Authorization URL created successfully",
    };
    res.json(response);
  });

  public logout = asyncHandler(async (req: Request, res: Response) => {
    this.spotifyService.logout();
    const response: BaseResponse = {
      success: true,
      message: "Logged out successfully",
    };
    res.json(response);
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
      const frontendUrl = new URL(FRONTEND_CALLBACK_URL);
      frontendUrl.searchParams.append("success", success ? "true" : "false");
      frontendUrl.searchParams.append(
        "message",
        success ? "Login successful" : "Login failed"
      );

      res.redirect(frontendUrl.toString());
    } catch (err) {
      console.error("Error in Spotify callback:", err);
      const frontendUrl = new URL(FRONTEND_CALLBACK_URL);
      frontendUrl.searchParams.append("success", "false");
      frontendUrl.searchParams.append(
        "message",
        "An error occurred during authentication"
      );
      res.redirect(frontendUrl.toString());
    }
  });

  public validLoginState = asyncHandler(async (req: Request, res: Response) => {
    const { loginState } = req.body;

    if (!loginState) {
      throw new ValidationError("No login state provided");
    }

    const response: ValidLoginStateResponse = {
      success: true,
      valid: loginState === "true",
      message:
        loginState === "true" ? "Login state is true" : "Login state is false",
    };
    res.json(response);
  });

  public getAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const data = this.spotifyService.getAccessToken();
    const response: DataResponse<string | undefined> = {
      success: true,
      data: data,
      message: "Access token retrieved successfully",
    };
    res.json(response);
  });
}
