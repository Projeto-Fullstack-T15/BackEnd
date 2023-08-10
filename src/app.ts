import "express-async-errors";
import "reflect-metadata";
import * as express from "express";
import { handleErrors } from "./errors";
import { Application } from "express";
import * as cors from "cors";
import { AnnouncementRoutes } from "./modules/logicandstructure/routes/AnnouncementRoutes";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

// Import all routes here

app.use("/announcement", AnnouncementRoutes);

app.use(handleErrors);

export default app;
