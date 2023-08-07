import { Request, Response } from "express";
import { getHelloService } from "./example.services";
import { GetHelloReponse } from "./example.interfaces";

export const getHelloController = async (
    request: Request,
    response: Response
) => {
    const helloWorldString = await getHelloService();

    const responseObject: GetHelloReponse = {
        message: helloWorldString,
        origin: request.hostname,
    };

    return response.status(200).json(responseObject);
}