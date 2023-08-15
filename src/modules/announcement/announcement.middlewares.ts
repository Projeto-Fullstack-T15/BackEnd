import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";
import { Repository } from "typeorm";
import { Announcement } from "./announcement";
import { AppDataSource } from "../../data-source";

export const ensureAnnouncementExists = async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const id: number = Number(request.params.id);

  if (isNaN(id) || id.toFixed() !== String(id)) {
    throw new AppError("Wrong parameter ID: it should be an intenger", 400);
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
