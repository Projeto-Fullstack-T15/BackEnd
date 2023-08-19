import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./errors";
import { logWithDate } from "./utils/logWithDate.util";
import { getAllEndpoints } from "./utils/getAllRoutes.util";
import * as global from "./modules/global";
import * as announcement from "./modules/announcement";
import * as account from "./modules/account";
import "express-async-errors";

const app: Application = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
	})
);

app.use(express.json());

const routes: Array<global.interfaces.CustomRoute> = [
	{ path: "accounts", router: account.router },
	{ path: "announcements", router: announcement.router },
];

routes.forEach((route) => {
	const path = `/api/${route.path}`;
	const endpoints = getAllEndpoints(route.router, path);
	endpoints.forEach((e) => logWithDate(`[ROUTE] ${e}`));
	app.use(path, route.router);
});

app.use(errorHandler);

export default app;
