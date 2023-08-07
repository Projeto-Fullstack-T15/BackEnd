import 'express-async-errors';
import * as express from 'express';
import { errorHandler } from './errors';
import * as cors from 'cors';
import { exampleRoutes } from './modules/example/example.routes';

const app: express.Application = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Import all routes here
const routes: Array<express.Router> = [
    exampleRoutes,
];

routes.forEach((route) => {
    app.use(route);
});

app.use(errorHandler);

export default app;