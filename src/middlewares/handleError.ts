import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError";

export function handleError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json(new AppError(error.message, error.statusCode));
  }

  return response
    .status(500)
    .send(new AppError(`Internal server error - ${error.message}`, 500));
}
