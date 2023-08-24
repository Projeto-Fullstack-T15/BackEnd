import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import cors from "cors";
import * as Global from "./modules/global";
import * as Announcement from "./modules/announcement";
import { logWithDate } from "./utils/logWithDate.util";
import { getAllEndpoints } from "./utils/getAllRoutes.util";
import * as servicesUser from "./modules/user/servicesUser";
import * as User from "./modules/user/cotrollerslogin";
import * as listUserAnnouncement from "./modules/user/servicesUser";
const app: Application = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

const routes: Array<Global.interfaces.CustomRoute> = [
  { path: "announcements", router: Announcement.router },
  { path: "users/login", router: User.router },
  { path: "users/delete", router: servicesUser.router },
  { path: "users/resetPassword", router: servicesUser.router },
  { path: "users/new-password", router: servicesUser.router },
  { path: "users/", router: listUserAnnouncement.router },
];

routes.forEach((route) => {
  const path = `/api/${route.path}`;
  app.use(path, route.router);

  const endpoints = getAllEndpoints(route.router, path);

  endpoints.forEach((e) => logWithDate(`[ROUTE] ${e}`));
});

app.use(errorHandler);

export default app;
