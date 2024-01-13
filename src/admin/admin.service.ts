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
      const admin = await this.adminRepository.create(createAdminDto);

      await this.adminRepository.save(admin);

      const hashedPassword = await bcrypt.hashSync(
        createAdminDto?.password,
        10,
      );

      const auth = await this.authRepository.create({
        username: createAdminDto?.email,
        password: hashedPassword,
        admin: admin,
      });

      await this.authRepository.save(auth);
      return admin;
    } catch (error) {
      if (error.code === 1062) {
        throw 'EmailId already exists';
      }
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
        throw new NotFoundException(`Admin User with ID ${id} not found`);
      }
      return admin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateAdminDto: UpdateAdminDto,
    user: any,
  ): Promise<Admin> {
    try {
      const admin = await this.findOne(id);
      if (!admin) {
        throw new NotFoundException(`Admin User with ID #${id} not found`);
      }

      if (user?.email != admin.email) {
        throw new HttpException(
          'You are not authorized to perform this action, since you are not the owner of this account',
          HttpStatus.UNAUTHORIZED,
        );
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

  async remove(id: string, user: any): Promise<any> {
    try {
      const admin = await this.findOne(id);

      if (user?.email != admin.email) {
        throw new HttpException(
          'You are not authorized to perform this action, since you are not the owner of this account',
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.authRepository.delete({ admin: admin });
      await this.adminRepository.delete(id);
      return 'Successfully removed user';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
