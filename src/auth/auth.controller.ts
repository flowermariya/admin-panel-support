import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { AdminService } from 'src/admin/admin.service';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create admin user' })
  @ApiResponse({
    status: 201,
    description: 'The admin has been successfully created.',
    type: Admin,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiBody({ type: CreateAdminDto })
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.create(createAdminDto);
  }

  @Post()
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: Auth })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<Admin> {
    return await this.authService.login(loginDto);
  }
}
