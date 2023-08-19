import { Router } from "express";
import { CreateAccountSchema, LoginAccountSchema } from "./account.schemas";
import * as global from "../global";
import * as controllers from "./account.controller";

export const accountRouter = Router();

accountRouter.post(
    "",
    global.middlewares.parseBodyWith(CreateAccountSchema),
    controllers.create
);

accountRouter.post(
    "/login",
    global.middlewares.parseBodyWith(LoginAccountSchema),
    controllers.login
);

