import { Body, Controller, Delete, Get, Headers, HttpCode, HttpException, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { nguoi_dung } from '@prisma/client';
import { User } from './entities/nguoi-dung.entity';
import { UploadAvatarDto } from './dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('NguoiDung')
@Controller('users')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) { }

  // Get all users
  @HttpCode(200)
  @Get()
  findAll(): Promise<nguoi_dung[]> {
    return this.nguoiDungService.findAll();
  }

  // Create user
  @ApiHeader({
    name: 'token'
  })
  @HttpCode(200)
  @Post()
  createUser(
    @Body() body: User,
    @Headers('token') token: string) {
    try {
      return this.nguoiDungService.createUser(body, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Delete user
  @HttpCode(200)
  @Delete('/:id')
  deleteUser(@Param('id') id: number, @Headers('token') token: string) {
    try {
      return this.nguoiDungService.deleteUser(id * 1, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get User By Id
  @HttpCode(200)
  @Get('/:id')
  findUserById(@Param('id') id: number) {
    try {
      return this.nguoiDungService.findUserById(id * 1)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Update User
  @HttpCode(200)
  @Put('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() body: User
  ) {
    try {
      return this.nguoiDungService.updateUser(id * 1, body)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Search User by Name
  @HttpCode(200)
  @Get('/search/:name')
  searchUserByName(
    @Param('name') name: string
  ) {
    try {
      return this.nguoiDungService.searchUserByName(name)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Upload User Avatar
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadAvatarDto
  })
  @Post('/upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @Headers('token') token: string,
    @UploadedFile() file: Express.Multer.File) {
    try {
      return this.nguoiDungService.uploadAvatar(file, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }
}
