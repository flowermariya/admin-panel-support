import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { SalesModule } from './sales/sales.module';
var fs = require('fs');
import * as path from 'path';
require('dotenv').config();

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      driver: require('mysql2'),
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, '..', 'certs', 'ca.pem')),
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    AuthModule,
    ProductModule,
    CustomerModule,
    SalesModule,
  ],
})
export class AppModule {}
