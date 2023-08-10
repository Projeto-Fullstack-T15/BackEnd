import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors";
import { AppDataSource } from "../../../data-source";
import { Announcement } from "../../../entity/Announcement";
import { Repository } from "typeorm";

export const checkDuplicateBrandAndModel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  console.log(req.body);

  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  if (req.method === "POST") {
    const existingAnnouncement: Announcement | undefined =
      await announcementRepository.findOne({
        where: { Brand: body.Brand, Model: body.Model, Year: body.Year },
      });

    if (existingAnnouncement) {
      throw new AppError("ad has already been created", 400);
    }
  } else if (req.method === "PATCH") {
    const existingAnnouncement: Announcement | undefined =
      await announcementRepository.findOne({
        where: { Brand: body.Brand, Model: body.Model, Year: body.Year },
      });

    if (existingAnnouncement) {
      throw new AppError("ad already updated", 400);
    }
  }

  next();
};
