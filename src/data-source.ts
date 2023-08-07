import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { User } from "./entity/User";

type DatabaseType = "mysql" | "postgres" | "sqlite";

export const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE as DatabaseType,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
