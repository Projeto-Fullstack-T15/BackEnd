import * as controllers from "./user.controllers";
import * as global from "../../global";
import * as middlewares from "../cotrollerslogin/middlewares";
import Router from "express";
import { SchemaUpdateUserRequest } from "./user.schemas";
export const userRoutes = Router();
userRoutes.patch(
  "/:id",
  global.middlewares.parseBodyWith(SchemaUpdateUserRequest),
  middlewares.verifyIdMiddUser
);

userRoutes.delete(
  "/:id",
  middlewares.verifyIdMiddUser,
  middlewares.verifyTokenValidMidd,
  middlewares.verifyUserLogging,
  controllers.removeUser
);
userRoutes.post("", controllers.forgetPassword);
userRoutes.post("/:token", controllers.newPassword);

userRoutes.get(
  "/:id/Announcement",
  middlewares.verifyIdMiddUser,
  middlewares.verifyTokenValidMidd,
  controllers.listUserAnnouncementControllers
);
