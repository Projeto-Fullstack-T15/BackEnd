import { NextFunction, Request, Response } from "express";
import { z } from 'zod';

export const parseBodyWith = (schema: z.Schema<any>) => {
    return async (
        request: Request,
        response: Response,
        nextFunction: NextFunction
    ) => {
        console.log("reqbody: ", request.body)
        const parsedData = schema.parse(request.body);

        console.log("parsed: ", parsedData)
        request.parsedData = parsedData;

        nextFunction();
    };
}