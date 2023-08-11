import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Announcement } from "../announcement.entity";
import { AppError } from "../../../errors";
import { AnnouncementResponse, AnnouncementUpdateRequest } from "../announcement.interfaces";
import { GetAnnouncementSchema } from "../announcement.schemas";

export async function update(
    data: AnnouncementUpdateRequest,
    ID: number
): Promise<AnnouncementResponse> {
    const isIdAnInteger: boolean = isNaN(ID) || String(ID) !== ID.toFixed(0);
    if (!isIdAnInteger) {
        throw new AppError("ID parameter should be an intenger", 400);
    }

    const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);

    const findAnnouncement: Announcement = await announcementsRepository.findOne({ where: { ID } });
    if (!findAnnouncement) {
        throw new AppError("Announcement not found", 404);
    }

    await announcementsRepository.update(findAnnouncement, data);

    const updatedAnnouncement = await announcementsRepository.findOne({ where: { ID } });
    const parsedAnnouncement = GetAnnouncementSchema.parse(updatedAnnouncement);

    return parsedAnnouncement;
}