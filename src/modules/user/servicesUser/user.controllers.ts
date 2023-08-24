import { Request, Response } from "express";

import { User } from "../../../entity/User";
import * as services from "./index.user";
import * as servicesListUserAnnounc from "./recover.function.index";
export const removeUser = async (
  request: Request,
  response: Response
): Promise<Response<User>> => {
  const id: number = parseInt(request.params.id);
  const removeUser = await services.deleteUserService(id);

  return response.status(204).json(removeUser);
};

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

  return res.status(200).json(sendEmail);
};

export const listUserAnnouncementControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  console.log(id);
  const send = await servicesListUserAnnounc.listUserAnnouncement(id);
  return res.status(200).json(send);
};
