import { Controller, Get, Post, Body, Param, Delete, HttpCode, Headers, HttpException, Put, Query, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { vi_tri } from '@prisma/client';
import { CreateLocation } from './entities/vi-tri.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './dto/upload.dto';

@ApiTags('ViTri')
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) { }

  // Get all locations
  @HttpCode(200)
  @Get()
  findAll() {
    return this.viTriService.findAll()
  }

  // Create location
  @ApiHeader({
    name: 'token'
  })
  @HttpCode(200)
  @Post()
  createLocation(
    @Body() body: CreateLocation,
    @Headers('token') token: string) {
    try {
      return this.viTriService.createLocation(body, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get Location Pagination
  @ApiQuery({ name: "keyword", required: false })
  @HttpCode(200)
  @Get('/phan-trang-tim-kiem')
  getLocationPage(
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

      return this.viTriService.getLocationPage(pageIndexNumber, pageSizeNumber, keyword)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Find Location by Id
  @HttpCode(200)
  @Get('/:id')
  getLocationById(@Param('id') id: number) {
    try {
      return this.viTriService.getLocationById(id * 1)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Update Location
  @HttpCode(200)
  @Put('/:id')
  updateLocation(
    @Param('id') id: number,
    @Headers('token') token: string,
    @Body() body: CreateLocation) {
    try {
      return this.viTriService.updateLocation(id * 1, token, body)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Delete Location
  @HttpCode(200)
  @Delete('/:id')
  deleteLocation(@Param('id') id: number, @Headers('token') token: string) {
    try {
      return this.viTriService.deleteLocation(id * 1, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Upload Location Img
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadDto
  })
  @Post('/upload-hinh-vitri')
  @UseInterceptors(FileInterceptor('file'))
  uploadLocationImg(
    @Query("maViTri") maViTri: number,
    @Headers('token') token: string,
    @UploadedFile() file: Express.Multer.File) {
    try {
      return this.viTriService.uploadLocationImg(maViTri * 1, file, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }
}
