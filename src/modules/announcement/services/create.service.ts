import { Repository } from "typeorm";
import { Announcement } from "../announcement.entity";
import { AppDataSource } from "../../../data-source";
import { AnnouncementCreateRequest, AnnouncementResponse } from "../announcement.interfaces";
import { CreateAnnouncementSchema, GetAnnouncementResponse } from "../announcements.schemas";

export async function createNew(data: AnnouncementCreateRequest): Promise<AnnouncementResponse> {
    const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);

    const parsedInputData = CreateAnnouncementSchema.parse(data);
    const newAnnouncement: Announcement = announcementsRepository.create(parsedInputData);

    await announcementsRepository.save(newAnnouncement);

    const parsedAnnouncement = GetAnnouncementResponse.parse(newAnnouncement);

    return parsedAnnouncement;
};