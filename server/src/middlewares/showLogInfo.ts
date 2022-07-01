import { NextFunction, Request, Response } from "express";
import { format } from "date-fns";
import { getDurationInMilliseconds } from "../utils/getDurationInMilliseconds";

export function showLogInfo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const date = format(new Date(), "dd'-'MM'-'yyyy' 'HH':'mm':'ss");

  const { method, url } = request;
  const { statusCode } = response;

  const hrTime = process.hrtime();
  const duration = getDurationInMilliseconds(hrTime);

  const log = `[${date}] ${method}:${url} -> ${statusCode} | ${duration.toFixed(2)}ms`;
  console.log(log);

  return next();
}
