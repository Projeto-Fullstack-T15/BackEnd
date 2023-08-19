import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AnnouncementUpdateRequest } from "../announcement.interfaces";
import { Announcement } from "../announcement.entity";

export async function update(
	announcement: Announcement,
	updateData: AnnouncementUpdateRequest
): Promise<Announcement> {
	const announcementsRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);

	await announcementsRepository.update(announcement.id, {
		brand: updateData.brand ?? announcement.brand,
		model: updateData.model ?? announcement.model,
		color: updateData.color ?? announcement.color,
		year: updateData.year ?? announcement.year,
		fuelType: updateData.fuelType ?? announcement.fuelType,
		mileage: updateData.mileage ?? announcement.mileage,
		price: updateData.price ?? announcement.price,
		description: updateData.description ?? announcement.description,
	});

	const updatedAnnouncement = await announcementsRepository.findOneBy({
		id: announcement.id,
	});

	return updatedAnnouncement!;
}
