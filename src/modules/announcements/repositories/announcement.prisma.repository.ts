import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AnnouncementRepository } from './announcement.repository';
import { PrismaService } from 'src/database/prisma.service';
import { Account, Announcement, Image } from '@prisma/client';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';

@Injectable()
export class AnnouncementPrismaRepository implements AnnouncementRepository {
  constructor(private readonly db: PrismaService) {}

  public async create(
    account_id: number,
    data: CreateAnnouncementDto
  ): Promise<Announcement> {
    try {
      const newAnnouncement = await this.db.announcement.create({
        data: { ...data, account_id },
      });

      return newAnnouncement;
    } catch (err) {
      throw new InternalServerErrorException(
        'An error ocurred when tried to create announcement'
      );
    }
  }

  public async update(
    id: number,
    data: UpdateAnnouncementDto
  ): Promise<Announcement> {
    try {
      const updatedAnnouncement = await this.db.announcement.update({
        data,
        where: { id },
      });

      return updatedAnnouncement;
    } catch {
      throw new InternalServerErrorException(
        'An error ocurred when tried to create announcement'
      );
    }
  }

  public async remove(id: number): Promise<void> {
    try {
      await this.db.announcement.delete({
        where: { id: id },
      });
    } catch {
      throw new InternalServerErrorException(
        'An error ocurred when tried to delete announcement'
      );
    }
  }

  public async getOneById(id: number): Promise<Announcement> {
    try {
      const findAnnouncement = await this.db.announcement.findUnique({
        where: { id },
        include: {
          account: {
            include: { user: true, address: true },
          },
        },
      });

      return findAnnouncement;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'An error ocurred when tried to find announcement'
      );
    }
  }

  public async getMany(): Promise<Array<Announcement & { account: Account }>> {
    try {
      const allAnnouncements = await this.db.announcement.findMany({
        include: { account: { include: { user: true } }, gallery_images: true },
      });

      return allAnnouncements;
    } catch {
      throw new InternalServerErrorException(
        'An error ocurred when tried to get announcements'
      );
    }
  }

  public async insertImage(
    announcement_id: number,
    url: string
  ): Promise<Image> {
    try {
      const newImage = await this.db.image.create({
        data: { url, announcement_id },
      });

      return newImage;
    } catch {
      throw new InternalServerErrorException(
        'An error ocurred when tried to insert an image'
      );
    }
  }

  public async removeImage(id: number): Promise<void> {
    try {
      await this.db.image.delete({
        where: { id },
      });

      return;
    } catch {
      throw new InternalServerErrorException(
        'An error ocurred when tried to delete image'
      );
    }
  }
}
