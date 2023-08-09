import { Request, Response } from "express";
import { createServiceAnnouncement } from "../createServiceAnnouncement/createServiceAnnouncement";
import { GetHelloReponse } from "../example.interfaces";

export const postAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const Data: any = request.body;
  const responseAnnouncement = await createServiceAnnouncement(Data);

  return response.status(201).json(responseAnnouncement);
};
