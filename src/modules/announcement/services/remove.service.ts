import { Repository } from "typeorm";
import { Announcement } from "../announcement.entity";
import { AppDataSource } from "../../../data-source";
import { AnnouncementResponse } from "../announcement.interfaces";
import { GetAnnouncementResponse } from "../announcements.schemas";
import { AppError } from "../../../errors";

export async function remove(ID: number): Promise<AnnouncementResponse> {
    const isIdAnInteger: boolean = isNaN(ID) || String(ID) !== ID.toFixed(0);
    if (!isIdAnInteger) {
        throw new AppError("ID parameter should be an intenger", 400);
    }

    const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);

    const findAnnouncement: Announcement = await announcementsRepository.findOne({ where: { ID } });
    if (!findAnnouncement) {
        throw new AppError("Announcement not found", 404);
    }

    await announcementsRepository.remove(findAnnouncement);

    const parsedAnnouncement = GetAnnouncementResponse.parse(findAnnouncement);

    return parsedAnnouncement;
};