import { Router } from "express";
import * as controllers from "./example.controllers";

export const exampleRoutes = Router();

exampleRoutes.post("hello-world/", controllers.getHelloController);
