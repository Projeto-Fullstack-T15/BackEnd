import { Repository } from "typeorm";
import { Announcement } from "../announcement.entity";
import { AppDataSource } from "../../../data-source";

export async function list(): Promise<Array<Announcement>> {
    const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);
    const findAnnouncements = await announcementsRepository.find();

    return findAnnouncements;
};