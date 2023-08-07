import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
    const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}');

    const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    const databaseURL = `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    return {
        type: DB_TYPE as "postgres" | "mysql",
        url: databaseURL,
        synchronize: false,
        logging: false,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    };
};

export const AppDataSource = new DataSource(dataSourceConfig());