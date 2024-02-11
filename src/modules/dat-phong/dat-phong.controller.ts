import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpException, Headers, Put } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { ApiTags } from '@nestjs/swagger';
import { dat_phong } from '@prisma/client';
import { Booking } from './entities/dat-phong.entity';

@ApiTags('DatPhong')
@Controller('dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) { }

  // Get Booking List
  @HttpCode(200)
  @Get()
  findAll(): Promise<dat_phong[]> {
    return this.datPhongService.findAll()
  }

  // Create Booking
  @HttpCode(200)
  @Post()
  createBooking(
    @Body() body: Booking,
    @Headers('token') token: string) {
    try {
      return this.datPhongService.createBooking(body, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get Booking by Id
  @HttpCode(200)
  @Get('/:id')
  getBookingById(
    @Param('id') id: number) {
    return this.datPhongService.getBookingById(id * 1)
  }

  // Update Booking
  @HttpCode(200)
  @Put('/:id')
  updateBooking(
    @Param('id') id: number,
    @Headers('token') token: string,
    @Body() body: Booking) {
    try {
      return this.datPhongService.updateBooking(id * 1, token, body)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Delete Booking
  @HttpCode(200)
  @Delete('/:id')
  deleteBooking(@Param('id') id: number, @Headers('token') token: string) {
    try {
      return this.datPhongService.deleteBooking(id * 1, token)
    } catch (exception) {
      throw new HttpException(exception.response, exception.status)
    }
  }

  // Get Booking by User Id
  @HttpCode(200)
  @Get('/lay-theo-nguoi-dung/:MaNguoiDung')
  getBookingByUserId(
    @Param('MaNguoiDung') id: number) {
    return this.datPhongService.getBookingByUserId(id * 1)
  }
}
