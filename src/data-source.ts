import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as path from "path";
import { Announcement } from "./modules/announcement/announcement.entity";
import { User } from "./modules/user/user.entity";
import { Account } from "./modules/account/account.entity";
import { Address } from "./modules/address/address.entity";

const dataSourceConfig = (): DataSourceOptions => {
	const migrationsPath: string = path.join(__dirname, "./migration/**.{ts,js}");

	const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
	const databaseURL = `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

	return {
		type: DB_TYPE as "postgres" | "mysql",
		url: databaseURL,
		synchronize: false,
		logging: false,
		entities: [Announcement, Account, Address, User],
		migrations: [migrationsPath],
	};
};

export const AppDataSource = new DataSource(dataSourceConfig());
