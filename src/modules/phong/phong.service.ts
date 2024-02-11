import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, phong } from '@prisma/client';
import { AuthenticationService } from 'src/utils/authentication.service';
import { Phong } from './entities/phong.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PhongService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  // Get all Rooms
  async findAll(): Promise<phong[]> {
    const rooms = await this.prisma.phong.findMany()
    return rooms
  }

  // Create Room
  async createRoom(body: Phong, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const checkLocation = await this.prisma.vi_tri.findFirst({
      where: {
        id: body.ma_vi_tri
      }
    })

    if (checkLocation) {
      const newRoom = await this.prisma.phong.create({
        data: body
      })

      const { ma_nguoi_dung, ...rest } = newRoom

      return {
        message: "Create Room Successfully",
        data: rest
      }
    } else {
      throw new HttpException("Location not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Get Room by Location
  async getRoomByLocation(maViTri: number) {
    const getLocation = await this.prisma.vi_tri.findFirst({
      where: {
        id: maViTri
      }
    })

    if (getLocation) {
      const roomList = await this.prisma.phong.findMany({
        where: {
          ma_vi_tri: maViTri
        }
      })

      if (roomList.length > 0) {
        return roomList
      } else {
        throw new HttpException("There are no rooms at this location", HttpStatus.NOT_FOUND)
      }

    } else {
      throw new HttpException("Location not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Get Room Pagination
  async getRoomPage(pageIndex: number, pageSize: number, keyword: string) {
    const where = keyword ? { ten_phong: { contains: keyword } } : {};

    const totalCount = await this.prisma.phong.count({ where });

    const result = await this.prisma.phong.findMany({
      where,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize
    })

    return { result, totalCount }
  }

  // Get Room by Id
  async getRoomById(id: number) {
    const room = await this.prisma.phong.findFirst({
      where: {
        id
      }
    })

    if (room) {
      const { ma_nguoi_dung, ...rest } = room

      return rest
    } else {
      throw new HttpException("Room cannot be found!", HttpStatus.NOT_FOUND)
    }
  }

  // Update Room
  async updateRoom(id: number, token: string, body: Phong) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const checkRoom = await this.prisma.phong.findFirst({
      where: {
        id
      }
    })
    if (checkRoom) {
      const newData = await this.prisma.phong.update({
        where: {
          id
        }, data: body
      })

      const { ma_nguoi_dung, ...rest } = newData

      return {
        message: "Update Room Successfully",
        data: rest
      }
    } else {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Delete Room
  async deleteRoom(id: number, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const checkRoom = await this.prisma.phong.findFirst({
      where: {
        id
      }
    })
    if (checkRoom) {
      await this.prisma.phong.delete({
        where: {
          id
        }
      })

      return "Delete Successfully"
    } else {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Upload Room Img
  async uploadRoomImg(maPhong: number, file: Express.Multer.File, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const getRoom = await this.prisma.phong.findFirst({
      where: {
        id: maPhong
      }
    })

    if (getRoom) {
      const phongImgUrl = await this.cloudinary.uploadFile(file, 'phong').catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

      const newData = await this.prisma.phong.update({
        where: {
          id: maPhong
        }, data: {
          hinh_anh: phongImgUrl.url
        }
      })

      const { ma_nguoi_dung, ...rest } = newData

      return {
        message: "Update Room Image Successfully",
        data: rest
      }
    } else {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }
  }
}
