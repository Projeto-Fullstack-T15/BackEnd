import { z } from "zod";
import {
    GetAnnouncementSchema,
    ListAnnouncementSchema,
    CreateAnnouncementSchema,
    UpdateAnnouncementSchema
} from "./announcement.schemas";

export type AnnouncementCreateRequest = z.infer<typeof CreateAnnouncementSchema>;
export type AnnouncementUpdateRequest = z.infer<typeof UpdateAnnouncementSchema>;
export type ParsedAnnouncement = z.infer<typeof GetAnnouncementSchema>;
export type ParsedAnnouncementList = z.infer<typeof ListAnnouncementSchema>;