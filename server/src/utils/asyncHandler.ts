import { AsyncRequestHandler } from "../types/types";

export const asyncHandler = (fn: AsyncRequestHandler): AsyncRequestHandler => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };