import * as controllers from "./user.controllers";

import * as global from "../global";
import * as middlewares from "../../modules/user/cotrollerslogin/middlewares";
import Router from "express";
export const userRoutes = Router();
// userRoutes.patch(
//     "/:id",
//     global.middlewares.parseBodyWith(UpdateAnnouncementSchema),
//     middlewares.verifyIdMiddUser,
//     controllers.update
// );

userRoutes.delete(
  "/:id",
  middlewares.verifyIdMiddUser,
  middlewares.verifyTokenValidMidd,
  middlewares.verifyUserLogging,
  controllers.removeUser
);
