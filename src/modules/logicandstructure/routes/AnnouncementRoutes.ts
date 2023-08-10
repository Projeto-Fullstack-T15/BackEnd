import { Router } from "express";
import deleteAnnouncControllers, * as controllers from "../controllers/controllers";
//import * as controllersUpdate from "../AnnouncementController/"
import { verifyBodyValid } from "../middlewares/Annoucuncement.middlewares";
import {
  AnnouncementSchema,
  AnnouncementSchemaRequest,
  updateAnnouncementSchemaRquest,
} from "../schemas/Announcement.schema";
import { checkDuplicateBrandAndModel } from "../middlewares/Aannoccounment.midd.verifiy";
import myControllers from "../controllers/controllers";
import { verifyIdMidd } from "../middlewares/verrifyIdExists";
export const AnnouncementRoutes = Router();
AnnouncementRoutes.post(
  "",
  verifyBodyValid(AnnouncementSchemaRequest),
  checkDuplicateBrandAndModel,
  controllers.postAnnouncementController
);
AnnouncementRoutes.get("", controllers.getAnnouncementController);

AnnouncementRoutes.patch(
  "/:id",
  verifyIdMidd,
  verifyBodyValid(updateAnnouncementSchemaRquest),
  checkDuplicateBrandAndModel,
  controllers.updateAnnouncementController
);
AnnouncementRoutes.delete("/:id", verifyIdMidd, deleteAnnouncControllers);
