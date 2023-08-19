import { Repository } from "typeorm";

import { AppDataSource } from "../../../data-source";
import { Announcement } from "../announcement.entity";

export async function remove(
	announcement: Announcement
): Promise<Announcement> {
	const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);
	await announcementsRepository.remove(announcement);

	return announcement;
}
