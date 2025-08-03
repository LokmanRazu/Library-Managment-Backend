
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { Request } from 'express';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.access_token || null, // Fallback to null
                ExtractJwt.fromAuthHeaderAsBearerToken(), // Support header tokens too
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true,
        })
    }
    async validate(req: Request, payload: any) {
        console.log(payload.sub + "   payloaadddd")
        const { sub } = payload
        const user = await this.userService.findOne(sub)
        if (!user) {
            throw new UnauthorizedException('Login First')
        }
        return user
    }

}
