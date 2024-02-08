import { Body, Controller, Delete, Get, Headers, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  // Get User Pagination
  @ApiQuery({ name: "keyword", required: false })
  @HttpCode(200)
  @Get('/phan-trang-tim-kiem')
  getUserPage(
    @Query("pageIndex") pageIndex: string,
    @Query("pageSize") pageSize: string,
    @Query("keyword") keyword: string
  ) {
    try {
      const pageIndexNumber = parseInt(pageIndex, 10);
      const pageSizeNumber = parseInt(pageSize, 10);

      if (isNaN(pageIndexNumber) || isNaN(pageSizeNumber) || pageIndexNumber < 1 || pageSizeNumber < 1) {
        throw new HttpException(`"pageIndex" and "pageSize" must be greater than 0`, HttpStatus.BAD_REQUEST);
      }

      return this.nguoiDungService.getUserPage(pageIndexNumber, pageSizeNumber, keyword)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get User By Id
  @HttpCode(200)
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    try {
      return this.nguoiDungService.getUserById(id * 1)
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
  @Get('/search/:TenNguoiDung')
  searchUserByName(
    @Param('TenNguoiDung') name: string
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
