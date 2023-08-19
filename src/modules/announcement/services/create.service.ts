import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AnnouncementCreateRequest } from "../announcement.interfaces";
import { Announcement } from "../announcement.entity";

export async function createNew(
	data: AnnouncementCreateRequest
): Promise<Announcement> {
	const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);

	const newAnnouncement: Announcement = announcementsRepository.create(data);
	await announcementsRepository.save(newAnnouncement);

	return newAnnouncement;
}
