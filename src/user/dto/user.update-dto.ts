import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.request-dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}