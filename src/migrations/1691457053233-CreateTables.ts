import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1691457053233 implements MigrationInterface {
    name = 'CreateTables1691457053233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("ID" SERIAL NOT NULL, "Text" text NOT NULL, "AnnouncementID" integer, "UserID" integer, CONSTRAINT "PK_105370c42b15d59dfe65f543d18" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "announcements" ("ID" SERIAL NOT NULL, "Brand" character varying NOT NULL, "Model" character varying NOT NULL, "Color" character varying NOT NULL, "Year" integer NOT NULL, "FuelType" character varying NOT NULL, "Mileage" integer NOT NULL, "Price" numeric(10,2) NOT NULL, "PriceTableFIPE" numeric(10,2) NOT NULL, "Description" text NOT NULL, "UserID" integer, CONSTRAINT "PK_7b61eb84aed8907302aa6d2ff57" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("ID" SERIAL NOT NULL, "ZipCode" character varying NOT NULL, "State" character varying NOT NULL, "City" character varying NOT NULL, "Street" character varying NOT NULL, "Number" character varying NOT NULL, "Complement" character varying NOT NULL, CONSTRAINT "PK_a2f09cc7649357257e7e0a93351" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "users" ("ID" SERIAL NOT NULL, "Name" character varying NOT NULL, "CPF" character varying NOT NULL, "Phone" character varying NOT NULL, "BirthDate" date NOT NULL, "Description" text NOT NULL, "AccountID" integer, "AddressID" integer, CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF"), CONSTRAINT "REL_7418b67f580b47395f2b667cde" UNIQUE ("AccountID"), CONSTRAINT "REL_e69e63528e6e125dd577214898" UNIQUE ("AddressID"), CONSTRAINT "PK_5763954075431ddd0821cd906da" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("ID" SERIAL NOT NULL, "Email" character varying NOT NULL, "Password" character varying NOT NULL, "AccountType" character varying NOT NULL, "UserID" integer, CONSTRAINT "UQ_66b851be8b51f7b0b6f92e27156" UNIQUE ("Email"), CONSTRAINT "REL_3b9a5c89a72b71a4ffdf5ddecf" UNIQUE ("UserID"), CONSTRAINT "PK_54b3857538e66be4738ef5a5889" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_680fe406e69f89f5d621f1c7f55" FOREIGN KEY ("AnnouncementID") REFERENCES "announcements"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_27584761b71bb1b546d45b32f90" FOREIGN KEY ("UserID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_a57c3b2f8d05587ef48f28d7373" FOREIGN KEY ("UserID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7418b67f580b47395f2b667cde0" FOREIGN KEY ("AccountID") REFERENCES "accounts"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e69e63528e6e125dd5772148985" FOREIGN KEY ("AddressID") REFERENCES "addresses"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3b9a5c89a72b71a4ffdf5ddecf0" FOREIGN KEY ("UserID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3b9a5c89a72b71a4ffdf5ddecf0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e69e63528e6e125dd5772148985"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7418b67f580b47395f2b667cde0"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_a57c3b2f8d05587ef48f28d7373"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_27584761b71bb1b546d45b32f90"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_680fe406e69f89f5d621f1c7f55"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "announcements"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
