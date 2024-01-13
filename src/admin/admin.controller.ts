import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

@ApiTags('Admin')
@Controller('admin')
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'Get all admin users' })
  @ApiResponse({
    status: 200,
    description: 'Return all admin users',
    type: [Admin],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Admin[]> {
    return await this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the admin by ID',
    type: Admin,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Admin> {
    return await this.adminService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({
    status: 200,
    description: 'Admin has been successfully updated',
    type: Admin,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.update(id, updateAdminDto, req?.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({
    status: 200,
    description: 'Admin has been successfully deleted',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: any) {
    return await this.adminService.remove(id, req?.user);
  }
}
