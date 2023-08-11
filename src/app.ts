import "express-async-errors";
import * as express from "express";
import { errorHandler } from "./errors";
import * as cors from "cors";

const app: express.Application = express();
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
	})
);

const routes: Array<express.Router> = [];

routes.forEach((route) => {
	app.use(route);
});

app.use(errorHandler);

export default app;
