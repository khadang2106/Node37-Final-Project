import { Controller, Get, Post, Body, Delete, HttpCode, Headers, HttpException, Query, Param, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhongService } from './phong.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
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

  // Get Room by Id
  @HttpCode(200)
  @Get('/:id')
  getRoomById(
    @Param('id') id: number) {
    return this.phongService.getRoomById(id * 1)
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
