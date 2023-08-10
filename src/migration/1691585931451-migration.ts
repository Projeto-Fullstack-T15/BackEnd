import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691585931451 implements MigrationInterface {
    name = 'Migration1691585931451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcements" ("ID" SERIAL NOT NULL, "Brand" character varying NOT NULL, "Model" character varying NOT NULL, "Color" character varying NOT NULL, "Year" integer NOT NULL, "FuelType" character varying NOT NULL, "Mileage" integer NOT NULL, "Price" numeric(10,2) NOT NULL, "PriceTableFIPE" numeric(10,2) NOT NULL, "Description" text NOT NULL, CONSTRAINT "PK_7b61eb84aed8907302aa6d2ff57" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "announcements"`);
    }

}
