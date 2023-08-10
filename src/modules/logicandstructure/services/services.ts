import { Repository } from "typeorm";
import { Announcement } from "../../../entity/Announcement";
//import { Tmovie, TmovieRequest } from "../interfaces/movies.interface";
import { AppDataSource } from "../../../data-source";
import {
  TAnnouncementRequest,
  TupdateAnnouncementUpdateRequest,
} from "../example.interfaces";
import {
  AnnouncementSchema,
  AnnouncementSchemaGet,
} from "../schemas/Announcement.schema";
import { TAnnouncementResponse } from "../example.interfaces";
import { FindOneOptions } from "typeorm";
import { AppError } from "../../../errors";
import { number } from "zod";

export const createServiceAnnouncement = async (
  Data: Announcement
): Promise<Announcement> => {
  const AnnouncementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const newAnnouncement: Announcement = AnnouncementRepository.create(Data);

  console.log(newAnnouncement);

  await AnnouncementRepository.save(newAnnouncement);

  const returnAnnouncement: any = AnnouncementSchema.parse(newAnnouncement);

  return returnAnnouncement;
};

export const listAnuuncService = async (): Promise<TAnnouncementResponse> => {
  const userRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const users = await userRepository.find();
  console.log(users);
  const usersResponse: any = AnnouncementSchemaGet.parse(users);
  console.log(usersResponse);
  return usersResponse;
};

export const updateAnnouncementServices = async (
  data: TupdateAnnouncementUpdateRequest,
  id: number
): Promise<Announcement> => {
  if (isNaN(id)) {
    throw new AppError("invalid fields", 400);
  }
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const existingAnnouncement = await announcementRepository.findOne({
    where: { ID: id },
  });
  if (!existingAnnouncement) {
    throw new AppError("Announcement not found", 404);
  }
  await announcementRepository.update(id, data);
  const updatedAnnouncement = await announcementRepository.findOne({
    where: { ID: id },
  });
  return updatedAnnouncement;
};

const deleteAcoouncService = async (id: number): Promise<Announcement> => {
  const clientRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const item = await clientRepository.findOne({
    where: { ID: id },
  });
  await clientRepository.remove(item);

  return item;
};
export default deleteAcoouncService;
