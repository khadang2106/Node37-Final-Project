import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, binh_luan } from '@prisma/client';
import { AuthenticationService } from 'src/utils/authentication.service';
import { BinhLuan } from './entities/binh-luan.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class BinhLuanService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  // Get Comments
  async findAll() {
    const comments = await this.prisma.binh_luan.findMany({
      where: { deleted_at: null },
      select: {
        id: true,
        ma_phong: true,
        ma_nguoi_binh_luan: true,
        ngay_binh_luan: true,
        noi_dung: true,
        sao_binh_luan: true,
        deleted_at: false
      }
    })
    return comments
  }

  // Create Comment
  async createComment(body: BinhLuan, token: string) {
    const decodeToken = await this.jwtService.decode(token);

    const checkRoom = await this.prisma.phong.findFirst({
      where: {
        id: body.ma_phong,
        deleted_at: null
      }
    })

    if (checkRoom) {
      const newComment = await this.prisma.binh_luan.create({
        data: {
          ...body,
          ma_nguoi_binh_luan: decodeToken.data.id,
          ngay_binh_luan: new Date(),
          deleted_at: null
        },
        select: {
          id: true,
          ma_phong: true,
          ma_nguoi_binh_luan: true,
          ngay_binh_luan: true,
          noi_dung: true,
          sao_binh_luan: true,
          deleted_at: false
        }
      })

      return {
        message: "Comment Successfully",
        data: newComment
      }

    } else {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Update Comment
  async updateComment(id: number, token: string, body: BinhLuan) {
    const decodeToken = await this.jwtService.decode(token);

    const checkRoom = await this.prisma.phong.findFirst({
      where: {
        id: body.ma_phong,
        deleted_at: null
      }
    })

    if (checkRoom) {
      const getComment = await this.prisma.binh_luan.findFirst({
        where: {
          id,
          deleted_at: null
        }
      })
      if (getComment) {
        if (getComment.ma_nguoi_binh_luan === decodeToken.data.id) {
          const newData = await this.prisma.binh_luan.update({
            where: {
              id
            }, data: {
              ...body,
              ma_nguoi_binh_luan: decodeToken.data.id,
              ngay_binh_luan: new Date(),
            },
            select: {
              id: true,
              ma_phong: true,
              ma_nguoi_binh_luan: true,
              ngay_binh_luan: true,
              noi_dung: true,
              sao_binh_luan: true,
              deleted_at: false
            }
          })

          return {
            message: "Update Comment Successfully",
            data: newData
          }
        } else {
          throw new HttpException("This is not your comment. Permission denied!", HttpStatus.UNAUTHORIZED)
        }
      } else {
        throw new HttpException("Comment not existed", HttpStatus.NOT_FOUND)
      }
    } else {
      throw new HttpException("Room not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Delete Comment
  async deleteComment(id: number, token: string) {
    const decodeToken = await this.jwtService.decode(token);

    const getComment = await this.prisma.binh_luan.findFirst({
      where: {
        id,
        deleted_at: null
      }
    })
    if (getComment) {
      if (getComment.ma_nguoi_binh_luan === decodeToken.data.id) {
        await this.prisma.binh_luan.update({
          where: {
            id
          }, data: {
            ...getComment, deleted_at: new Date()
          }
        })

        return "Delete Comment Successfully"
      } else {
        throw new HttpException("This is not your comment. Permission denied!", HttpStatus.UNAUTHORIZED)
      }
    } else {
      throw new HttpException("Comment not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Get Comment by Room Id
  async getCommentByRoomId(id: number) {
    const commentList = await this.prisma.binh_luan.findMany({
      where: {
        ma_phong: id,
        deleted_at: null
      },

      select: {
        id: true,
        ma_phong: true,
        ma_nguoi_binh_luan: true,
        ngay_binh_luan: true,
        noi_dung: true,
        sao_binh_luan: true,
        deleted_at: false,
        nguoi_dung: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    if (commentList.length > 0) {
      return commentList
    } else {
      throw new HttpException("Room not existed!", HttpStatus.NOT_FOUND)
    }
  }
}
