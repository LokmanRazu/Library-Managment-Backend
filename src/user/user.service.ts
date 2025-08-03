import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { UserResponseDto, UserResponseWithPasswordDto } from "./dto/user.response-dto";
import { plainToInstance } from "class-transformer";
import { hashPassword } from "utils/utils";
import { CreateUserDto } from "./dto/user.request-dto";
import { UpdateUserDto } from "./dto/user.update-dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
        async findAll(): Promise<UserResponseDto[]> {
        let data = await this.userModel.find().exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

     async findOne(id: string): Promise<UserResponseDto> {
        let data = await this.userModel.findById(id).exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

        async findOneByEmail(email: string): Promise<UserResponseWithPasswordDto> {
        let data = await this.userModel.findOne({ email }).exec();
        return plainToInstance(UserResponseWithPasswordDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

       async creat(dto: CreateUserDto): Promise<UserResponseDto> {
        let { name, email, password } = dto;
        let data = await this.userModel.create({
            name,
            email,
            password: hashPassword(password)
        });
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

        async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
        let data = await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        }); 
    };

       async delete(id: string): Promise<UserResponseDto> {
        let data = await this.userModel.findByIdAndDelete(id).exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        }) };
}