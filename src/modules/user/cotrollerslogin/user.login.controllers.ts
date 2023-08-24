import { Request, Response } from "express";
import * as services from "./servicesUserLogin/services";
import { TloginRequest, TtokenLoginResponse } from "./user.login.interface";
export const createLogin = async (
  request: Request,
  response: Response
): Promise<Response<string>> => {
  const loginData: TloginRequest = request.body;

  const token: TtokenLoginResponse = await services.createLoginService(
    loginData
  );

  return response.status(201).json(token);
};
