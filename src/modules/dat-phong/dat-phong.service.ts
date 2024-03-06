import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';
import { PrismaClient, dat_phong } from '@prisma/client';
import { Booking } from './entities/dat-phong.entity';
import * as moment from 'moment';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class DatPhongService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  private isValidDateFormat(dateString: string): boolean {
    return moment(dateString, 'DD/MM/YYYY', true).isValid();
  }

  // Get Booking List
  async findAll() {
    const bookingList = await this.prisma.dat_phong.findMany()

    return bookingList.map((booking) => {
      const { deleted_at, ...rest } = booking;
      return rest
    })
  }

  // Create Booking
  async createBooking(body: Booking, token: string) {
    const decodeToken = await this.jwtService.decode(token);

    const checkRoom = await this.prisma.phong.findFirst({
      where: {
        id: body.ma_phong
      }
    })

    if (!checkRoom) {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }

    if (!this.isValidDateFormat(body.ngay_den) || !this.isValidDateFormat(body.ngay_di)) {
      throw new BadRequestException('Invalid date! Please enter the date in the format DD/MM/YYYY.');
    }

    const newBooking = await this.prisma.dat_phong.create({
      data: {
        ...body,
        ma_nguoi_dat: decodeToken.data.id,
        ngay_den: moment(body.ngay_den, 'DD/MM/YYYY').toISOString(),
        ngay_di: moment(body.ngay_di, 'DD/MM/YYYY').toISOString()
      }
    })

    const { deleted_at, ...rest } = newBooking;

    return {
      message: "Booking Successfully",
      data: rest
    }
  }

  // Get Booking by Id
  async getBookingById(id: number) {
    const booking = await this.prisma.dat_phong.findFirst({
      where: {
        id
      }
    })

    const { deleted_at, ...rest } = booking;

    if (booking) {
      return rest
    } else {
      throw new HttpException("Booking cannot found!", HttpStatus.NOT_FOUND)
    }
  }

  // Update Booking
  async updateBooking(id: number, token: string, body: Booking) {
    const decodeToken = await this.jwtService.decode(token);

    const checkRoom = await this.prisma.phong.findFirst({
      where: {
        id: body.ma_phong
      }
    })

    if (!checkRoom) {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }

    if (!this.isValidDateFormat(body.ngay_den) || !this.isValidDateFormat(body.ngay_di)) {
      throw new BadRequestException('Invalid date! Please enter the date in the format DD/MM/YYYY.');
    }

    const getBooking = await this.prisma.dat_phong.findFirst({
      where: {
        id
      }
    })
    if (getBooking) {
      if (getBooking.ma_nguoi_dat === decodeToken.data.id) {
        const newData = await this.prisma.dat_phong.update({
          where: {
            id
          },
          data: {
            ...body,
            ma_nguoi_dat: decodeToken.data.id,
            ngay_den: moment(body.ngay_den, 'DD/MM/YYYY').toISOString(),
            ngay_di: moment(body.ngay_di, 'DD/MM/YYYY').toISOString()
          }
        })

        const { deleted_at, ...rest } = newData;

        return {
          message: "Update Booking Successfully",
          data: rest
        }
      } else {
        throw new HttpException("This is not your booking. Permission denied!", HttpStatus.UNAUTHORIZED)
      }
    } else {
      throw new HttpException("Booking not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Delete Booking
  async deleteBooking(id: number, token: string) {
    const decodeToken = await this.jwtService.decode(token);

    const getBooking = await this.prisma.dat_phong.findFirst({
      where: {
        id
      }
    })
    if (getBooking) {
      if (getBooking.ma_nguoi_dat === decodeToken.data.id) {
        await this.prisma.dat_phong.delete({
          where: {
            id
          }
        })

        return "Delete Booking Successfully"
      } else {
        throw new HttpException("This is not your booking. Permission denied!", HttpStatus.UNAUTHORIZED)
      }
    } else {
      throw new HttpException("Booking not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Get Booking by User Id
  async getBookingByUserId(id: number) {
    const bookingList = await this.prisma.dat_phong.findMany({
      where: {
        ma_nguoi_dat: id
      },
      include: {
        nguoi_dung: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    if (bookingList.length > 0) {
      return bookingList.map((booking) => {
        const { deleted_at, ...rest } = booking;
        return rest
      })
    } else {
      throw new HttpException("Booking not existed!", HttpStatus.NOT_FOUND)
    }
  }
}
