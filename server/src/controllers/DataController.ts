import { NextFunction, Request, Response } from "express";
import { IDataService } from "../interface/interface";
import { NotFoundError } from "../utils/customError";

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export class DataController {
  constructor(private spotifyService: IDataService) {}

  public getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.spotifyService.getUserProfile();
    if (data === null) {
      throw new NotFoundError("User profile not found");
    } else {
      res.json({
        success: true,
        imageUrl: data.body.images[0]?.url,
        data: data.body,
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
          (item: any) => ({
            artist: item.track.artists[0].name,
            song: item.track.name,
            albumCoverUrl: item.track.album.images[2].url,
          })
        );
        res.json({
          success: true,
          data: extractedData,
        });
      }
    }
  );

  public getMyTopArtists = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.spotifyService.getMyTopArtists();
    const extractedData = data.body.items.map(
      (item: any) => ({
        name: item.name,
        imageUrl: item.images[1].url,
      })
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
        (item: any) => ({
          songName: item.name,
          artistName: item.artists.map((artist: any) => artist.name).join(", "),
          albumCoverUrl: item.album.images[0]?.url || "",
        })
      );
    res.json({
      success: true,
      data: extractedData,
    });
  });
}