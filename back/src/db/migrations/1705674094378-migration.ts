import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705674094378 implements MigrationInterface {
    name = 'Migration1705674094378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Email" character varying NOT NULL, "Password" character varying NOT NULL, "Verification" boolean NOT NULL DEFAULT false, "Role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "Forgot_Password_Link" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
