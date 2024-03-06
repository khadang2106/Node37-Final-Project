import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, vi_tri } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateLocation } from './entities/vi-tri.entity';
import { AuthenticationService } from 'src/utils/authentication.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ViTriService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  // Get all locations
  async findAll() {
    const locations = await this.prisma.vi_tri.findMany({
      where: {
        deleted_at: null
      }, select: {
        id: true,
        ten_vi_tri: true,
        tinh_thanh: true,
        quoc_gia: true,
        hinh_anh: true,
        deleted_at: false
      }
    })
    return locations
  }

  // Create location
  async createLocation(body: CreateLocation, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const { ten_vi_tri, tinh_thanh, quoc_gia } = body

    const newLocation = await this.prisma.vi_tri.create({
      data: {
        ten_vi_tri,
        tinh_thanh,
        quoc_gia,
        deleted_at: null
      }
    })
    return {
      message: "Create New Location Successfully",
      data: newLocation
    }
  }

  // Get Location Pagination
  async getLocationPage(pageIndex: number, pageSize: number, keyword: string) {
    const where = keyword ? { ten_vi_tri: { contains: keyword }, deleted_at: null } : { deleted_at: null };

    const totalCount = await this.prisma.vi_tri.count({ where });

    const result = await this.prisma.vi_tri.findMany({
      where,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        ten_vi_tri: true,
        tinh_thanh: true,
        quoc_gia: true,
        hinh_anh: true,
        deleted_at: false
      }
    })

    return { result, totalCount }
  }

  // Find Location by Id
  async getLocationById(id: number) {
    const location = await this.prisma.vi_tri.findFirst({
      where: {
        id,
        deleted_at: null
      },
      select: {
        id: true,
        ten_vi_tri: true,
        tinh_thanh: true,
        quoc_gia: true,
        hinh_anh: true,
        deleted_at: false
      }
    })

    if (location) {
      return location
    } else {
      throw new HttpException("Location not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Update Location
  async updateLocation(id: number, token: string, body: CreateLocation) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const checkLocation = await this.prisma.vi_tri.findFirst({
      where: {
        id,
        deleted_at: null
      }
    })
    if (checkLocation) {
      const newData = await this.prisma.vi_tri.update({
        where: {
          id
        }, data: body,
        select: {
          id: true,
          ten_vi_tri: true,
          tinh_thanh: true,
          quoc_gia: true,
          hinh_anh: true,
          deleted_at: false
        }
      })

      return {
        message: "Update Location Successfully",
        data: newData
      }
    } else {
      throw new HttpException("Location not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Delete Location
  async deleteLocation(id: number, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const checkLocation = await this.prisma.vi_tri.findFirst({
      where: {
        id
      }
    })
    if (checkLocation) {
      const checkDeleted = checkLocation.deleted_at;

      if (checkDeleted) {
        throw new HttpException("Already deleted", HttpStatus.BAD_REQUEST)
      }

      await this.prisma.vi_tri.update({
        where: {
          id
        }, data: { ...checkLocation, deleted_at: new Date() }
      })

      const getDeletedLocation = await this.prisma.vi_tri.findFirst({
        where: { id }
      });

      const getDeletedDate = getDeletedLocation.deleted_at;

      return `Delete Successfully At ${getDeletedDate}`
    } else {
      throw new HttpException("Location not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Upload Location Img
  async uploadLocationImg(maViTri: number, file: Express.Multer.File, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const getLocation = await this.prisma.vi_tri.findFirst({
      where: {
        id: maViTri,
        deleted_at: null
      }
    })

    if (getLocation) {
      const locationImgUrl = await this.cloudinary.uploadFile(file, 'vi-tri').catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

      const newData = await this.prisma.vi_tri.update({
        where: {
          id: maViTri
        }, data: {
          hinh_anh: locationImgUrl.url
        },
        select: {
          id: true,
          ten_vi_tri: true,
          tinh_thanh: true,
          quoc_gia: true,
          hinh_anh: true,
          deleted_at: false
        }
      })

      return {
        message: "Update Location Image Successfully",
        data: newData
      }
    } else {
      throw new HttpException("Location not existed", HttpStatus.NOT_FOUND)
    }
  }
}
