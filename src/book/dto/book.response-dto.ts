// dto/book.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class BookResponseDto {
    @Expose()
    _id: string;

    @Expose()
    img: string;

    @Expose()
    title: string;
    @Expose()
    author: string;

    @Expose()
    type: string;

    @Expose()
    description: string;

    @Expose()
    rating: string;

    @Expose()
    user: string;
}
