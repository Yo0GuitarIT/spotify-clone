import { NextFunction, Request, Response } from "express";
export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface DataResponse<T> extends BaseResponse {
  data: T;
}

export interface ValidLoginStateResponse extends BaseResponse {
  valid: boolean;
}

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface UserProfile {
  imageUrl: string | undefined;
}

export interface Track {
  artistName: string;
  songName: string;
  albumCoverUrl: string;
}

export interface Artist {
  artistName: string;
  imageUrl: string;
}