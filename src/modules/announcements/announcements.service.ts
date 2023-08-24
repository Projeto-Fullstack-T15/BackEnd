import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto, CreateAnnouncementRequest } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementRepository } from './repositories/announcement.repository';
import { plainToInstance } from 'class-transformer';
import { Announcement } from './entities/announcement.entity';
import { GalleryImage } from './entities/image.entity';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class AnnouncementsService {
	constructor(
		private readonly repository: AnnouncementRepository
	) { }

	public async create(accountId: number, createAnnouncementDto: CreateAnnouncementRequest) {
		const { images, ...announcement } = createAnnouncementDto;

		const newAnnouncement = await this.repository.create(accountId, announcement);
		const announcementInstance = plainToInstance(Announcement, newAnnouncement);
		announcementInstance.gallery_images = [];

		for (const url of images) {
			const newImage = await this.repository.insertImage(newAnnouncement.id, url);
			const imageInstance = plainToInstance(GalleryImage, newImage)
			announcementInstance.gallery_images.push(imageInstance);
		}

		return announcementInstance;
	}

	public async findAll() {
		const allAnnouncements = await this.repository.getMany();

		const instancedAnnouncements = allAnnouncements.map((a) => {
			a.account = plainToInstance(Account, a.account);
			return plainToInstance(Announcement, a);
		});

		return instancedAnnouncements;
	}

	public async findOne(id: number) {
		const findAnnouncement = await this.repository.getOneById(id);

		if (!findAnnouncement) {
			throw new NotFoundException("Announcement not found");
		}

		const instancedAnnouncement = plainToInstance(Announcement, findAnnouncement);
		instancedAnnouncement.account = plainToInstance(Account, instancedAnnouncement.account);

		return instancedAnnouncement;
	}

	public async update(id: number, data: UpdateAnnouncementDto) {
		await this.findOne(id);

		const updatedAnnouncement = await this.repository.update(id, data);

		return plainToInstance(Announcement, updatedAnnouncement);
	}
}
