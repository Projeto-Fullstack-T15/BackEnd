import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const parseBodyWith = (schema: z.Schema<any>) => {
	return async (
		request: Request,
		response: Response,
		nextFunction: NextFunction
	) => {
		const parsedData = schema.parse(request.body);
		request.parsedData = parsedData;

		nextFunction();
	}
}
