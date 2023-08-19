import * as controllers from "./user.controllers";
import * as middlewares from "../../modules/user/cotrollerslogin/middlewares";
import * as global from "../global";
import { Request, Response } from "express";
import { Router } from "express";
import { User } from "../../entity/User";
import * as services from "./servicesUser/servicesUser";

export const removeUser = async (
  request: Request,
  response: Response
): Promise<Response<User>> => {
  const id: number = parseInt(request.params.id);
  const removeUser = await services.deleteUserService(id);

  return response.status(204).json(removeUser);
};
