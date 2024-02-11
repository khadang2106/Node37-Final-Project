import { Controller, Post, HttpCode, HttpException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Login, Register } from './dto/auth.dto';
import { nguoi_dung } from '@prisma/client';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  login(@Body() body: Login) {
    try {
      return this.authService.login(body);
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  @HttpCode(200)
  @Post('register')
  register(@Body() body: Register): Promise<nguoi_dung> {
    try {
      return this.authService.register(body);
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }

  }
}
