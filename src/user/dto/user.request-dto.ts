// dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ required: true, example: 'John' })
    @IsNotEmpty({ message: 'First name is required.' })
    @IsString({ message: 'First name must be string.' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;


    @ApiProperty({ required: true, example: 'some strong password' })
    @IsNotEmpty({ message: 'Password is required.' })
    @IsString({ message: 'Password must be string.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;
}
