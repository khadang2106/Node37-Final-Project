import { Controller, Get, Post, Body, Delete, HttpCode, Headers, HttpException, Query, Param, Put, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { PhongService } from './phong.service';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { phong } from '@prisma/client';
import { Phong } from './entities/phong.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPhongDto } from './dto/phong.dto';

@ApiTags('Phong')
@Controller('/phong-thue')
export class PhongController {
  constructor(private readonly phongService: PhongService) { }

  // Get all Rooms
  @HttpCode(200)
  @Get()
  findAllRoom(): Promise<phong[]> {
    return this.phongService.findAll()
  }

  // Create Room
  @HttpCode(200)
  @Post()
  createRoom(
    @Body() body: Phong,
    @Headers('token') token: string) {
    try {
      return this.phongService.createRoom(body, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get Room by Location
  @HttpCode(200)
  @Get('/lay-phong-theo-vi-tri')
  getRoomByLocation(
    @Query("maViTri") maViTri: number) {
    return this.phongService.getRoomByLocation(maViTri * 1)
  }

  // Get Room Pagination
  @ApiQuery({ name: "keyword", required: false })
  @HttpCode(200)
  @Get('/phan-trang-tim-kiem')
  getRoomPage(
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

      return this.phongService.getRoomPage(pageIndexNumber, pageSizeNumber, keyword)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get Room by Id
  @HttpCode(200)
  @Get('/:id')
  getRoomById(
    @Param('id') id: number) {
    try {
      return this.phongService.getRoomById(id * 1)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Update Room
  @HttpCode(200)
  @Put('/:id')
  updateRoom(
    @Param('id') id: number,
    @Headers('token') token: string,
    @Body() body: Phong) {
    try {
      return this.phongService.updateRoom(id * 1, token, body)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Delete Room
  @HttpCode(200)
  @Delete('/:id')
  deleteRoom(@Param('id') id: number, @Headers('token') token: string) {
    try {
      return this.phongService.deleteRoom(id * 1, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Upload Room Img
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadPhongDto
  })
  @Post('/upload-hinh-phong')
  @UseInterceptors(FileInterceptor('file'))
  uploadRoomImg(
    @Query("maPhong") maPhong: number,
    @Headers('token') token: string,
    @UploadedFile() file: Express.Multer.File) {
    try {
      return this.phongService.uploadRoomImg(maPhong * 1, file, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }
}
