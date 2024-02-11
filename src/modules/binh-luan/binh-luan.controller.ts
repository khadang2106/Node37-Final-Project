import { Controller, Get, Post, Body, Param, Delete, HttpCode, Headers, HttpException, Put } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { ApiTags } from '@nestjs/swagger';
import { binh_luan } from '@prisma/client';
import { BinhLuan } from './entities/binh-luan.entity';

@ApiTags('BinhLuan')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) { }

  // Get Comments
  @HttpCode(200)
  @Get()
  findAll(): Promise<binh_luan[]> {
    return this.binhLuanService.findAll()
  }

  // Create Comment
  @HttpCode(200)
  @Post()
  createComment(
    @Body() body: BinhLuan,
    @Headers('token') token: string) {
    try {
      return this.binhLuanService.createComment(body, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Update Comment
  @HttpCode(200)
  @Put('/:id')
  updateComment(
    @Param('id') id: number,
    @Headers('token') token: string,
    @Body() body: BinhLuan) {
    try {
      return this.binhLuanService.updateComment(id * 1, token, body)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Delete Comment
  @HttpCode(200)
  @Delete('/:id')
  deleteComment(
    @Param('id') id: number,
    @Headers('token') token: string,
  ) {
    try {
      return this.binhLuanService.deleteComment(id * 1, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get Comment by Room Id
  @HttpCode(200)
  @Get('/lay-binh-luan-theo-phong/:MaPhong')
  getCommentByRoomId(
    @Param('MaPhong') id: number) {
    return this.binhLuanService.getCommentByRoomId(id * 1)
  }
}
