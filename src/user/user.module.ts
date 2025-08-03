import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}