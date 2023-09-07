import { Account, Announcement, Image } from "@prisma/client";
import { CreateAnnouncementDto } from "../dto/create-announcement.dto";
import { UpdateAnnouncementDto } from "../dto/update-announcement.dto";

export abstract class AnnouncementRepository {
    public abstract create(account_id: number, data: CreateAnnouncementDto): Promise<Announcement>;
    public abstract update(id: number, data: UpdateAnnouncementDto): Promise<Announcement>;
    public abstract remove(id: number): Promise<void>
    public abstract getOneById(id: number): Promise<Announcement>;
    public abstract getMany(): Promise<Array<Announcement & { account: Account }>>;
    public abstract insertImage(announcement_id: number, url: string): Promise<Image>;
    public abstract removeImage(id: number): Promise<void>;
}