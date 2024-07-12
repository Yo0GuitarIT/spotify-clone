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
