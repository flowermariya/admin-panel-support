import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: Auth })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto): Promise<Admin> {
    return await this.authService.login(loginDto);
  }
}
