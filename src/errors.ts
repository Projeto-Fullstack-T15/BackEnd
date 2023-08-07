import { NextFunction, Request, Response } from 'express';
import { writeFileSync } from 'fs';
import { ZodError } from 'zod';
import * as path from 'path';

export class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super();
        this.message = message;
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
    saveErrorOnLog(request);

    if (error instanceof ZodError) {
        return response.status(400).json({ message: error.flatten().fieldErrors });
    };

    if (error instanceof RequestError) {
        return response.status(error.status).json({ message: error.message });
    }

    return response
        .status(500)
        .json({ message: error.message });
}

function saveErrorOnLog(json: Object) {
    const errorDate = new Date().toISOString();
    const filePath = path.join(__dirname, `../../../localFiles/errors`, `error_${errorDate}.json`);
    writeFileSync(filePath, JSON.stringify(json));
}