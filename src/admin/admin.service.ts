import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      const newAdmin = await this.adminRepository.create(createAdminDto);
      return await this.adminRepository.save(newAdmin);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Admin[]> {
    try {
      return this.adminRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Admin> {
    try {
      const admin = await this.adminRepository.findOne({ where: { id } });
      if (!admin) {
        throw new NotFoundException(`Admin User with ID #${id} not found`);
      }
      return admin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    try {
      const admin = await this.findOne(id);
      if (!admin) {
        throw new NotFoundException(`Admin User with ID #${id} not found`);
      }
      admin.name = updateAdminDto?.name;
      admin.gender = updateAdminDto?.gender;
      admin.phone = updateAdminDto?.phone;
      admin.email = updateAdminDto?.email;
      admin.role = updateAdminDto?.role;
      return admin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<any> {
    try {
      await this.findOne(id);
      await this.adminRepository.delete(id);
      return 'Successfully removed user';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
