import { Repository } from "typeorm";
import { Announcement } from "../../../entity/Announcement";
//import { Tmovie, TmovieRequest } from "../interfaces/movies.interface";
import { AppDataSource } from "../../../data-source";
import { AnnouncementSchemaResponse } from "../AnnouncementSchema/Announcement.schema";

export const createServiceAnnouncement = async (
  Data: any
): Promise<Announcement> => {
  const AnnouncementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const Announc: any = AnnouncementRepository.create(Data);
  await AnnouncementRepository.save(Announc);
  const returnAnnounc: any = AnnouncementSchemaResponse.parse(Announc);
  return returnAnnounc;
};
//trocar todas tipagens de reqquest e response
