import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

export const errorhandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  console.error("Unhandle error", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
