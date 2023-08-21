import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logWithDate } from "./utils/logWithDate.util";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class RequestError extends Error {
  public status: number;
  public message: string;

  constructor(
    status: number = 500,
    message: string = "Unknown problem in server, contact developers."
  ) {
    super();
    this.status = status;
    this.message = message;
  }
}

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  nextFunction: NextFunction
): Response {
  if (error instanceof ZodError) {
    console.error(error);
    return response.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof RequestError) {
    return response.status(error.status).json({ message: error.message });
  }

  logWithDate(
    `An error ocurred during a request... ${request.method.toUpperCase()} ${
      request.protocol
    }://${request.hostname}${request.path}`
  );

  return response.status(400).json({ message: error.message });
}
