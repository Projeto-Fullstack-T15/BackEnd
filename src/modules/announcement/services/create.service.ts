import { Repository } from "typeorm";
import { Announcement } from "../announcement";
import { AppDataSource } from "../../../data-source";
import { AnnouncementCreateRequest } from "../announcement.interfaces";

export async function createNew(
  data: AnnouncementCreateRequest
): Promise<Announcement> {
  const announcementsRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const newAnnouncement: Announcement = announcementsRepository.create(data);
  await announcementsRepository.save(newAnnouncement);

  return newAnnouncement;
}
