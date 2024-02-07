import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Headers, HttpException } from '@nestjs/common';
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
}
