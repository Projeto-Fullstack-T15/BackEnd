import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Announcement } from "../../../entity/Announcement";
import { AppError } from "../../../errors";
export async function verifyIdMidd(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const Aannoccounmentepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const id: number = parseInt(req.params.id);

  const accoun: Announcement | null = await Aannoccounmentepository.findOne({
    where: { ID: id },
  });

  if (!accoun) {
    throw new AppError("Announcement not found", 404);
  }

  next();
}
