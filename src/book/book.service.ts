import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { plainToInstance } from "class-transformer";
import { Book, BookDocument } from "./book.schema";
import { BookResponseDto } from "./dto/book.response-dto";
import { BookRequestDto } from "./dto/book.request-dto";
import { UpdateBookDto } from "./dto/book.update-dto";
import {uploadImageToCloudinary} from 'utils/utils'


@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }
    async findAll(): Promise<BookResponseDto[]> {
        let data = await this.bookModel.find().populate('user').exec();
        return plainToInstance(BookResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: string): Promise<BookResponseDto> {
        let data = await this.bookModel.findById(id).populate('user').exec();
        return plainToInstance(BookResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async creat( dto: BookRequestDto,file:any): Promise<BookResponseDto> {

        let { img,title, author, type, description, rating, user} = dto;
     let cludinarySecureURL =  await uploadImageToCloudinary(file.path)
        let data = await this.bookModel.create({
            img : cludinarySecureURL?.secure_url,
            title,
            author,
            type,
            description,
            rating,
            user
        });
        console.log('Bookdata', data);
        return plainToInstance(BookResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: string, dto: UpdateBookDto): Promise<BookResponseDto> {
        let data = await this.bookModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return plainToInstance(BookResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async delete(id: string): Promise<BookResponseDto> {
        let data = await this.bookModel.findByIdAndDelete(id).exec();
        return plainToInstance(BookResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })
    };
}