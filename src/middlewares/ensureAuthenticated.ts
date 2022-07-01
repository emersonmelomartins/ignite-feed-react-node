import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../shared/errors/AppError";

import authConfig from "../config/auth";

interface IDecodedJWT {
  id: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError("You must provide a token", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const decodedToken = verify(token, authConfig.secret) as IDecodedJWT;

    request.user = decodedToken.id;

    return next();
  } catch (err) {
    throw new AppError("Invalid token provided.", 401);
  }
}
