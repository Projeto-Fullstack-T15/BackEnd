import * as controllers from "./user.controllers";

import * as middlewares from "./user.midddlewares";
import * as global from "../global";
import Router from "express";
import { createLoginSchema } from "./user.schemas";

export const userLoginRouter = Router();

userLoginRouter.post(
  "",
  global.middlewares.parseBodyWith(createLoginSchema),
  controllers.createLogin
);
