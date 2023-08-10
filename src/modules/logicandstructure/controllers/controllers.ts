import { Request, Response } from "express";
import { Announcement } from "../../../entity/Announcement";
import {
  createServiceAnnouncement,
  updateAnnouncementServices,
} from "../services/services";
import deleteAcoouncService from "../services/services";
import { listAnuuncService } from "../services/services";
import {
  TAnnouncementRequest,
  TupdateAnnouncementUpdateRequest,
} from "../example.interfaces";
export const getAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const responseAnnouncement = await listAnuuncService();

  return response.status(200).json(responseAnnouncement);
};
export const postAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const Data: Announcement = request.body;
  const responseAnnouncement = await createServiceAnnouncement(Data);

  return response.status(201).json(responseAnnouncement);
};
export const updateAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const Data: Announcement = request.body;
  const id: number = parseFloat(request.params.id);

  const responseAnnouncement = await updateAnnouncementServices(Data, id);

  return response.status(200).json(responseAnnouncement);
};
const deleteAnnouncControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const deleteUser: Announcement = await deleteAcoouncService(id);
  return res.status(204).json(deleteUser);
};
export default deleteAnnouncControllers;
