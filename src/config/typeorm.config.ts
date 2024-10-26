import { DataSourceOptions } from 'typeorm';
require('dotenv').config();
export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: process.env.DB_USERNAME || 'root',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  logging: true,

};
