import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserResponseDto {
    @Expose()
    name: string;

    @Expose()
    email: string;

}

export class UserResponseWithPasswordDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    password: string;

}


