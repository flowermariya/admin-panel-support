import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'admin',
      password: 'adminpass',
      database: 'admin-panel',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
    CustomerModule,
    SalesModule,
  ],
})
export class AppModule {}
