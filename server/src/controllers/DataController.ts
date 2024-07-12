import { Request, Response } from "express";
import { IDataService } from "../interface/interface";
import { NotFoundError } from "../utils/customError";
import { asyncHandler } from "../utils/asyncHandler";
import { DataResponse } from "../types/types";
import { Track, Artist, UserProfile } from "../types/types";

export class DataController {
  constructor(private spotifyService: IDataService) {}

  public getUserProfile = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.spotifyService.getUserProfile();
    if (!data) {
      throw new NotFoundError("User profile not found");
    }
    const extractedData = { imageUrl: data.body.images[0]?.url };
    const response: DataResponse<UserProfile> = {
      success: true,
      data: extractedData,
      message: "User profile retrieved successfully",
    };
    res.json(response);
  });

  public getMyRecentlyPlayedTracks = asyncHandler(
    async (_req: Request, res: Response) => {
      const data = await this.spotifyService.getMyRecentlyPlayedTracks();
      if (!data) {
        throw new NotFoundError("No recently played tracks found");
      }
      const extractedData = data.body.items.map((item: any) => ({
        songName: item.track.name,
        artistName: item.track.artists[0].name ?? "Unknown Artist",
        albumCoverUrl: item.track.album.images[2].url ?? "",
      }));
      const response: DataResponse<Track[]> = {
        success: true,
        data: extractedData,
        message: "Recently played tracks retrieved successfully",
      };
      res.json(response);
    }
  );

  public getMyTopArtists = asyncHandler(
    async (_req: Request, res: Response) => {
      const data = await this.spotifyService.getMyTopArtists();
      if (!data) {
        throw new NotFoundError("My top artists not found");
      }
      const extractedData = data.body.items.map((item: any) => ({
        artistName: item.name,
        imageUrl: item.images[1].url,
      }));
      const response: DataResponse<Artist[]> = {
        success: true,
        data: extractedData,
        message: "Top artists retrieved successfully",
      };
      res.json(response);
    }
  );

  public getMyTopTracks = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.spotifyService.getMyTopTracks();
    if (!data) {
      throw new NotFoundError("My top tracks not found");
    }
    const extractedData = data.body.items.slice(0, 16).map((item: any) => ({
      songName: item.name,
      artistName: item.artists.map((artist: any) => artist.name).join(", "),
      albumCoverUrl: item.album.images[0]?.url ?? "",
    }));
    const response: DataResponse<Track[]> = {
      success: true,
      data: extractedData,
      message: "Top tracks retrieved successfully",
    };
    res.json(response);
  });
}
