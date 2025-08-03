// dto/book.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class BookRequestDto {
    @ApiProperty({ required: false,format: 'binary', example: 'https://example.com/image.jpg', description: 'URL of the book cover image' })
    @IsNotEmpty({ message: 'Image URL is required.' })
    @IsString({ message: 'Image URL must be a string.' })
    img?: string;

    @ApiProperty({ required: true, example: 'The Great Gatsby', description: 'Title of the book' })
    @IsNotEmpty({ message: 'Title is required.' })
    @IsString({ message: 'Title must be a string.' })
    title: string;

    @ApiProperty({ required: true, example: 'F. Scott Fitzgerald', description: 'Author of the book' })
    @IsNotEmpty({ message: 'Author is required.' })
    @IsString({ message: 'Author must be a string.' })
    author: string;

    @ApiProperty({ required: true, example: 'Fiction', description: 'Genre or type of the book' })
    @IsNotEmpty({ message: 'Type is required.' })
    @IsString({ message: 'Type must be a string.' })
    type: string;

    @ApiProperty({ required: true, example: 'A novel set in the 1920s about Jay Gatsby.', description: 'Brief description of the book' })
    @IsNotEmpty({ message: 'Description is required.' })
    @IsString({ message: 'Description must be a string.' })
    description: string;

    @ApiProperty({ required: true, example: '4.5', description: 'Rating of the book (as a string)' })
    @IsString({ message: 'Rating must be a string.' })
    rating: string;

    @ApiProperty({ required: true, example: '64d8f91e7cf1a30f94c0342e', description: 'User ID who created the book' })
    @IsNotEmpty({ message: 'User ID is required.' })
    @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId.' })
    user: string;
}
