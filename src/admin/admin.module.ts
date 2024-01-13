import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Auth])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
