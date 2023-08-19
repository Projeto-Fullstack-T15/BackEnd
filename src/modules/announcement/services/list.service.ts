import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Announcement } from "../announcement.entity";

export async function list(): Promise<Array<Announcement>> {
	const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);
	const findAnnouncements = await announcementsRepository.find();

	return findAnnouncements;
}
