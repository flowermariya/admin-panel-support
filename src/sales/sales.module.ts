import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [
    TypeOrmModule.forFeature([Sale]),
    AdminModule,
    CustomerModule,
    ProductModule,
  ],
})
export class SalesModule {}
