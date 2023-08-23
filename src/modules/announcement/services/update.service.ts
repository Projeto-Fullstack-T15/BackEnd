import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Announcement } from "../announcement";
import { AnnouncementUpdateRequest } from "../announcement.interfaces";
import { AppError, RequestError } from "../../../errors";

export async function update(
  id: number,
  updateData: AnnouncementUpdateRequest
): Promise<Announcement> {
  const announcementsRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const updatedAnnouncement = await announcementsRepository.findOneBy({
    id: id,
  });
  if (!updatedAnnouncement) {
    throw new AppError("Announcement not found", 404);
  }
  const transform = Object.assign(updatedAnnouncement, {
    ...updateData,
  });
  const newUserData: Announcement = await announcementsRepository.save(
    transform
  );

  return newUserData!;
}
