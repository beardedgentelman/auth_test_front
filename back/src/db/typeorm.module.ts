import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
require('dotenv').config();

const entitiesPath = join(__dirname, '/../**/*.entity{.ts,.js}');
const migrationsPath = join(__dirname, '/../**/db/migrations/*{.ts,.js}');

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      url: process.env.POSTGRES_URL,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [entitiesPath],
      autoLoadEntities: process.env.AUTOLOADENTITIES === 'true',
      synchronize: process.env.SYNCHRONIZE === 'true',
      migrations: [migrationsPath],
    }),
  ],
})
export class TypeOrmModule {}
