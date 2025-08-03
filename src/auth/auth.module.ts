import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "src/user/user.module";
import { JwtAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports:[
        PassportModule.register({defaultStrategy:'jwt'}), 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<any>('JWT_SECRET'),
                signOptions: { expiresIn: '50m' }
        }),
        inject: [ConfigService]
    }),
    UserModule
        
    ],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy,JwtAuthGuard],
    exports:[]
})
export class AuthModule{

}