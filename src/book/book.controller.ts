import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
  UseInterceptors,
  Req,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BookService } from './book.service';
import { BookRequestDto } from './dto/book.request-dto';
import { UpdateBookDto } from './dto/book.update-dto';
import { BookResponseDto } from './dto/book.response-dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterUploadMiddleware } from './middleware/multer.middleware';
import { FileUploadInterceptor } from './middleware/fileUpload.interceptor';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  async findAll(): Promise<BookResponseDto[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookResponseDto> {
    return this.bookService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileUploadInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: BookRequestDto): Promise<BookResponseDto> {
    // dto.img = file?.path
  console.log('fileeee pathhh', file.path);
    return this.bookService.creat(dto,file);
  }

  //   @Post()
  //   async create(@Req() req: Request, @Res() res: Response) {
  //   MulterUploadMiddleware(req, res, async () => {
  //     const file = req.file;
  //     const body = req.body;

  //     // You can now use `file` and `body` to call your service
  //     const dto = {
  //       ...body,
  //       img: file?.path || '',
  //     };

  //     return await this.bookService.creat(dto);

  //   });
  // }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BookResponseDto> {
    return this.bookService.delete(id);
  }
}
