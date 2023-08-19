import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logWithDate } from "./utils/logWithDate.util";

export class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export function errorHandler(
    error: Error,
    request: Request,
    response: Response,
    nextFunction: NextFunction
): Response {
    if (error instanceof ZodError) {
        return response.status(400).json({ message: error.flatten().fieldErrors });
    };

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    }

    logWithDate(`An error ocurred during a request... ${request.method.toUpperCase()} ${request.protocol}://${request.hostname}${request.path}`);

    return response
        .status(500)
        .json({ message: error.message });
}
