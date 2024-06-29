import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

export const errorhandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};