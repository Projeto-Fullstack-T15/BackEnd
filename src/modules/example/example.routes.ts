import { Router } from "express";
import * as controllers from "./example.controllers";

export const exampleRoutes = Router();

exampleRoutes.get(
    'hello-world/',
    controllers.getHelloController
);
