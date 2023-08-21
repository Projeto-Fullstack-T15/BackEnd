import * as controllers from "./user.controllers";

import * as global from "../global";
import * as middlewares from "../../modules/user/cotrollerslogin/middlewares";
import Router from "express";
import { SchemaUpdateUserRequest } from "./user.schemas";
export const userRoutes = Router();
userRoutes.patch(
  "/:id",
  global.middlewares.parseBodyWith(SchemaUpdateUserRequest),
  middlewares.verifyIdMiddUser
  // controllers.updateUsers
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
