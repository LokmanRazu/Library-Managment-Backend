import { PartialType } from '@nestjs/swagger';
import { BookRequestDto } from './book.request-dto';

export class UpdateBookDto extends PartialType(BookRequestDto) {}