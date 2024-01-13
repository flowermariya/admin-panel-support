import { ConnectionOptions } from 'typeorm';

require('dotenv').config();

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.PG_DB_HOST,
  port: parseInt(process.env.PG_DB_PORT, 10),
  username: process.env.PG_DB_USER_NAME,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
  synchronize: true,
};

export = config;
