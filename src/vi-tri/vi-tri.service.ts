import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, vi_tri } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateLocation } from './entities/vi-tri.entity';
import { AuthenticationService } from 'src/utils/authentication.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ViTriService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  // Get all locations
  async findAll(): Promise<vi_tri[]> {
    const location = await this.prisma.vi_tri.findMany()
    return location
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
      }
    })
    return {
      message: "Create New Location Successfully",
      data: newLocation
    }
  }

  // Get Location Pagination
  async getLocationPage(pageIndex: number, pageSize: number, keyword: string) {
    const where = keyword ? { ten_vi_tri: { contains: keyword } } : {};

    const totalCount = await this.prisma.vi_tri.count({ where });

    const result = await this.prisma.vi_tri.findMany({
      where,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize
    })

    return { result, totalCount }
  }

  // Find Location by Id
  async getLocationById(id: number): Promise<vi_tri> {
    const location = await this.prisma.vi_tri.findFirst({
      where: {
        id
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
        id
      }
    })
    if (checkLocation) {
      const newData = await this.prisma.vi_tri.update({
        where: {
          id
        }, data: body
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
      await this.prisma.vi_tri.delete({
        where: {
          id
        }
      })

      return "Delete Successfully"
    } else {
      throw new HttpException("Location not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Upload Location Img
  async uploadLocationImg(maViTri: number, file: Express.Multer.File, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const getLocation = await this.prisma.vi_tri.findFirst({
      where: {
        id: maViTri
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
