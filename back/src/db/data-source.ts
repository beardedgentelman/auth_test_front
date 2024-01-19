import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
require('dotenv').config();

const entitiesPath = join(__dirname, '/../**/*.entity{.ts,.js}');
const migrationsPath = join(__dirname, '/../**/migrations/*{.ts,.js}');
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [entitiesPath],
  synchronize: process.env.SYNCHRONIZE === 'true',
  migrations: [migrationsPath],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
