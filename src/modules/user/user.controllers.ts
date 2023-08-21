import * as controllers from "./user.controllers";
import * as middlewares from "../../modules/user/cotrollerslogin/middlewares";
import * as global from "../global";
import { Request, Response } from "express";
import { Router } from "express";
import { User } from "../../entity/User";
import * as services from "./servicesUser/servicesUser";
import {
  userUpdateRequest,
  userUpdateResponse,
} from "./servicesUser/user.interfaces";
import { SchemaUpdateUserResponse } from "./user.schemas";

export const removeUser = async (
  request: Request,
  response: Response
): Promise<Response<User>> => {
  const id: number = parseInt(request.params.id);
  const removeUser = await services.deleteUserService(id);

  return response.status(204).json(removeUser);
};
// export const updateUsers = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const Data: userUpdateRequest = req.body;
//   const id: number = parseInt(req.params.id);
//   const updateUser: UserInterface = await updateUsers(Data, id);
//   return res.status(200).json(updateUser);
// };
export const forgetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;
  const sendEmail = await services.sendEmailServices(email);
  res.locals = {
    sendEmail,
    ...res.locals,
  };
  return res.status(200).json("email enviado com sucesso");
};
export const newPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { password } = req.body;
  const { token } = req.params;
  const sendEmail = await services.newUpdate(password, token);

  return res.status(200).json("senha alterada com sucesso");
};
