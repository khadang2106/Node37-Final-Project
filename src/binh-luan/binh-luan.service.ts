import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, binh_luan } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthenticationService } from 'src/utils/authentication.service';
import { BinhLuan } from './entities/binh-luan.entity';

@Injectable()
export class BinhLuanService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  // Get Comments
  async findAll(): Promise<binh_luan[]> {
    const comments = await this.prisma.binh_luan.findMany()
    return comments
  }

  // Create Comment
  async createComment(body: BinhLuan, token: string) {
    const decodeToken = await this.jwtService.decode(token);

    const checkRoom = await this.prisma.phong.findFirst({
      where: {
        id: body.ma_phong
      }
    })

    if (checkRoom) {
      const { ma_phong, noi_dung, sao_binh_luan } = body

      const newComment = await this.prisma.binh_luan.create({
        data: {
          ...body,
          ma_nguoi_binh_luan: decodeToken.data.id,
          ngay_binh_luan: new Date(),
        }
      })

      return {
        message: "Leave Comment Successfully",
        data: newComment
      }

    } else {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }
  }
}
