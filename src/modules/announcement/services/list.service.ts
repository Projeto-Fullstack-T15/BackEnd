import { Repository } from "typeorm";
import { Announcement } from "../announcement.entity";
import { AnnouncementListResponse } from "../announcement.interfaces";
import { AppDataSource } from "../../../data-source";
import { ListAnnouncementSchema } from "../announcements.schemas";

export async function list(): Promise<AnnouncementListResponse> {
    const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);
    const findAnnouncements = await announcementsRepository.find();

    const parsedAnnouncements = ListAnnouncementSchema.parse(findAnnouncements);

    return parsedAnnouncements;
};