import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/user.request-dto";
import { UserService } from "src/user/user.service";
import { comparePassword } from "utils/utils";
import { LoginRequestDto } from "./dto/login.reques-dto";
import { Response } from 'express';

@Injectable()
export class AuthService {


    constructor(private readonly jwtService: JwtService, private userService: UserService) { }
    async signup(dto: CreateUserDto) {
        console.log('dto', dto);
        await this.userService.creat(dto);

    }

    async login(dto: LoginRequestDto, res: Response): Promise<any> {
        let user = await this.userService.findOneByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException('Invalid email or Password')
        }
        let match = await comparePassword(user.password, dto.password)
        if (!match) {
            throw new UnauthorizedException('Invalid email or Password')
        }
        const payload = {
            sub: user.id,
            name: user.name,

        }
        console.log('payload', payload);
        const token = await this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET,expiresIn:'50m'});
        console.log("Tokeeenn", token);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
            sameSite: 'lax', // or 'strict' or 'none' depending on your frontend domain
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        return {
            message: 'Login Successfully',
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        }
    }
}