import { z } from "zod";
import {
    GetAnnouncementResponse,
    ListAnnouncementSchema,
    CreateAnnouncementSchema,
    UpdateAnnouncementSchema
} from "./announcement.schemas";

export type AnnouncementCreateRequest = z.infer<typeof CreateAnnouncementSchema>;
export type AnnouncementUpdateRequest = z.infer<typeof UpdateAnnouncementSchema>;
export type AnnouncementResponse = z.infer<typeof GetAnnouncementResponse>;
export type AnnouncementListResponse = z.infer<typeof ListAnnouncementSchema>;