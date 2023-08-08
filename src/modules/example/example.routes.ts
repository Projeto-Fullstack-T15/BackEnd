import { Router } from "express";
import * as controllers from "./example.controllers";
import { dataIsValidMidd } from "./example.middlewares";

export const exampleRoutes = Router();

exampleRoutes.post(
  "/announcement",
  dataIsValidMidd,
  controllers.getHelloController
);
