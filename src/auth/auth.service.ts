import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async login(createAuthDto: LoginDto): Promise<Admin> {
    try {
      const { username, password } = createAuthDto;

      const auth = await this.authRepository.findOne({
        where: { username },
        relations: ['admin'],
      });

      if (auth && bcrypt.compareSync(password, auth.password)) {
        return auth.admin;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
