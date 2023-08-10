import { DeepPartial } from "typeorm";
import {
  AnnouncementSchema,
  updateAnnouncementSchemaRquest,
} from "./schemas/Announcement.schema";
import { z } from "zod";
type TAnnouncementRequest = z.infer<typeof AnnouncementSchema>;
type TAnnouncementResponse = z.infer<typeof AnnouncementSchema>;
type TupdateAnnouncementUpdateRequest = DeepPartial<TAnnouncementRequest>;

export {
  TAnnouncementRequest,
  TAnnouncementResponse,
  TupdateAnnouncementUpdateRequest,
};
