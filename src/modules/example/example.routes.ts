import { Router } from "express";
import * as controllers from "./example.controllers";
import { dataIsValidMidd } from "./example.middlewares";
import { AnnouncementSchemaRequest } from "./example.schema";
export const exampleRoutes = Router();

exampleRoutes.post(
  "/announcement",
  dataIsValidMidd(AnnouncementSchemaRequest),
  controllers.getHelloController
);
