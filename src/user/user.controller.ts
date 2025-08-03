import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user.response-dto';
import { CreateUserDto } from './dto/user.request-dto';
import { UpdateUserDto } from './dto/user.update-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth("JWT-auth")
@UseGuards(AuthGuard('jwt')) 
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.creat(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.delete(id);
  }
}
