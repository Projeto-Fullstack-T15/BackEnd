import { NextFunction, Request, Response } from "express";
import { AppError, RequestError } from "../../errors";
import { Repository } from "typeorm";
import { Announcement } from "./announcement";
import { AppDataSource } from "../../data-source";
import {
  verifyUserLogging,
  verifyIdMiddUser,
  verifyTokenValidMidd,
} from "../user/cotrollerslogin/middlewares";
export { verifyIdMiddUser, verifyUserLogging, verifyTokenValidMidd };
export const ensureAnnouncementExists = async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const id: number = Number(request.params.id);

  if (isNaN(id) || id.toFixed() !== String(id)) {
    throw new RequestError(400, "Wrong parameter ID: it should be an intenger");
  }

  const announcementsRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const findAnnouncement: Announcement | null =
    await announcementsRepository.findOneBy({ id });

  if (!findAnnouncement) {
    throw new AppError("Announcement not found", 404);
  }

  request.announcement = findAnnouncement;

  nextFunction();
};
