import * as controllers from "./user.login.controllers";
import * as global from "../../global";
import { Router } from "express";
import { createLoginSchema } from "./user.schemas.login";

export const userLoginRouter = Router();

userLoginRouter.post(
  "",
  global.middlewares.parseBodyWith(createLoginSchema),
  controllers.createLogin
);
