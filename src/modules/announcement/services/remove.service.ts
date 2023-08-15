import { Repository } from "typeorm";
import { Announcement } from "../announcement";
import { AppDataSource } from "../../../data-source";

export async function remove(
  announcement: Announcement
): Promise<Announcement> {
  const announcementsRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  await announcementsRepository.remove(announcement);

  return announcement;
}
