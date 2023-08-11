import * as controllers from "./announcement.controllers";
import * as middlewares from "./announcement.middlewares";
import * as global from "../global";
import { Router } from "express";
import { CreateAnnouncementSchema, UpdateAnnouncementSchema } from "./announcement.schemas";

export const announcementRouter = Router();

announcementRouter.post(
    "",
    global.middlewares.parseBodyWith(CreateAnnouncementSchema),
    controllers.create
);

announcementRouter.get(
    "",
    controllers.list
);

announcementRouter.patch(
    "/:id",
    global.middlewares.parseBodyWith(UpdateAnnouncementSchema),
    middlewares.ensureAnnouncementExists,
    controllers.update
);

announcementRouter.delete(
    "/:id",
    middlewares.ensureAnnouncementExists,
    controllers.remove
);