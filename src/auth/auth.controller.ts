import { Body, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response-dto';
import { LoginRequestDto } from './dto/login.reques-dto';
import { CreateUserDto } from 'src/user/dto/user.request-dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller({ path: 'auth' })
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  @ApiOkResponse({ type: LoginResponseDto })
  async createUser(
    @Body() data: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    return this.authService.login(data, res);
  }

  @Post('signup')
  @ApiOkResponse({ type: String })
  async save(@Body() dto: CreateUserDto): Promise<string> {
    await this.authService.signup(dto);
    return 'Sign UP Sucessfully';
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Req() req) {
    return req.user;
  }
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    console.log('logout');
    return res.json({ message: 'Logged out successfully' }); 
  }
}
