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
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: LoginDto): Promise<any> {
    try {
      const { username, password } = createAuthDto;

      const auth = await this.authRepository.findOne({
        where: { username },
        relations: ['admin'],
      });

      console.log();

      if (auth && bcrypt.compareSync(password, auth.password)) {
        const user = {
          username: auth?.username,
          email: auth.admin.email,
          name: auth.admin.name,
          sub: auth?.admin?.id,
        };
        return {
          access_token: this.jwtService.sign(user),
        };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
