import { Router } from "express";
import * as controllers from "../AnnouncementController/postAnnouncementController";
import { dataIsValidMidd } from "../AnnouncementMiddlewares/Annoucuncement.middlewares";
import { AnnouncementSchemaRequest } from "../AnnouncementSchema/Announcement.schema";
export const AnnouncementRoutes = Router();

AnnouncementRoutes.post(
  "/announcement",
  dataIsValidMidd(AnnouncementSchemaRequest),
  controllers.postAnnouncementController
);
