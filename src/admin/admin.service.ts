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
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      const hashedPassword = await bcrypt.hashSync(
        createAdminDto?.password,
        10,
      );

      const admin = await this.adminRepository.create(createAdminDto);

      await this.adminRepository.save(admin);

      const auth = await this.authRepository.create({
        username: createAdminDto?.email,
        password: hashedPassword,
        admin: admin,
      });

      await this.authRepository.save(auth);
      return admin;
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
