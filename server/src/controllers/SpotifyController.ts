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
    },
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
        success ? "true" : "false",
      );

      res.redirect(frontendUrl.toString());
    } catch (err) {
      console.error("Error in Spotify callback:", err);
      const frontendUrl = new URL("http://localhost:5173/auth-callback");
      frontendUrl.searchParams.append("login_success", "false");
      frontendUrl.searchParams.append(
        "error",
        "An error occurred during authentication",
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
    },
  );

  public getAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const data = this.spotifyService.getAccessToken();
    res.json({
      success: true,
      data: data,
    });
  });

  public getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.spotifyService.getUserProfile();
    if (data === null) {
      throw new NotFoundError("No track currently playing");
    } else {
      res.json({
        success: true,
        imageUrl: data.body.images[0].url,
        data: data,
      });
    }
  });

  public getMyRecentlyPlayedTracks = asyncHandler(
    async (req: Request, res: Response) => {
      const data = await this.spotifyService.getMyRecentlyPlayedTracks();
      if (data === null || data.body.items.length === 0) {
        throw new NotFoundError("No recently played tracks found");
      } else {
        const extractedData = data.body.items.map(
          (item: {
            track: {
              artists: { name: any }[];
              name: any;
              album: { images: { url: any }[] };
            };
          }) => ({
            artist: item.track.artists[0].name,
            song: item.track.name,
            albumCoverUrl: item.track.album.images[2].url,
          }),
        );
        res.json({
          success: true,
          data: extractedData,
        });
      }
    },
  );

  public getNewReleases = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.spotifyService.getNewReleases();
    const extractedData = data.body.albums.items.map((item: any) => ({
      albumName: item.name,
      albumCoverUrl: item.images[0]?.url,
      artistName: item.artists.map((artist: any) => artist.name).join(", "),
    }));

    res.json({
      success: true,
      data: extractedData,
      other: data,
    });
  });

  public getMyTopArtists = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.spotifyService.getMyTopArtists();
    const extractedData = data.body.items.map(
      (item: { name: string; images: { url: string }[] }) => ({
        name: item.name,
        imageUrl: item.images[1].url,
      }),
    );
    res.json({
      success: true,
      data: extractedData,
    });
  });

  public getMyTopTracks = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.spotifyService.getMyTopTracks();
    const extractedData = data.body.items
      .slice(0, 16)
      .map(
        (item: {
          name: any;
          artists: any[];
          album: { images: { url: any }[] };
        }) => ({
          songName: item.name,
          artistName: item.artists.map((artist: any) => artist.name).join(", "),
          albumCoverUrl: item.album.images[0]?.url || "",
        }),
      );
    res.json({
      success: true,
      data: extractedData,
    });
  });
}
