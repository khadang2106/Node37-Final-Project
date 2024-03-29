import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';
import { User } from './entities/nguoi-dung.entity';
import * as bcrypt from "bcrypt"
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class NguoiDungService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  // Get all users
  async findAll() {
    const users = await this.prisma.nguoi_dung.findMany({
      where: {
        deleted_at: null
      }
    });

    const modifiedUsers = users.map(user => {
      const { pass_word, deleted_at, ...rest } = user;

      return rest
    })

    return modifiedUsers
  }

  // Create user
  async createUser(body: User, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const isExistedEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: body.email
      }
    })

    if (isExistedEmail) {
      throw new HttpException('Email existed!', HttpStatus.BAD_REQUEST)
    }

    const { email, pass_word, name, phone, birth_day, gender, role } = body

    const newUser = await this.prisma.nguoi_dung.create({
      data: {
        email,
        pass_word: bcrypt.hashSync(pass_word, 10),
        name,
        phone,
        birth_day,
        gender,
        role,
        deleted_at: null
      }
    })

    const { deleted_at, ...rest } = newUser;

    return {
      message: "Create New User Successfully",
      data: {
        ...rest,
        pass_word: ''
      }
    }
  }

  // Delete user
  async deleteUser(id: number, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        id,
        deleted_at: null
      }
    })
    if (checkUser) {
      await this.prisma.binh_luan.updateMany({
        where: {
          ma_nguoi_binh_luan: id
        },
        data: {
          deleted_at: new Date()
        }
      })

      await this.prisma.dat_phong.updateMany({
        where: {
          ma_nguoi_dat: id
        },
        data: {
          deleted_at: new Date()
        }
      })

      await this.prisma.nguoi_dung.update({
        where: {
          id
        },
        data: {
          deleted_at: new Date()
        }
      })

      return "Delete User Successfully"
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Get User Pagination
  async getUserPage(pageIndex: number, pageSize: number, keyword: string) {
    const where = keyword ? { name: { contains: keyword }, deleted_at: null } : { deleted_at: null };

    const totalCount = await this.prisma.nguoi_dung.count({ where });

    const result = await this.prisma.nguoi_dung.findMany({
      where,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize
    })

    const mappedResult = result.map((e) => {
      const { pass_word, deleted_at, ...rest } = e;

      return rest
    })

    return { mappedResult, totalCount }
  }

  // Get User By Id
  async getUserById(id: number) {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        id,
        deleted_at: null
      }
    })

    if (user) {
      const { pass_word, deleted_at, ...rest } = user;

      return rest
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Update User
  async updateUser(id: number, body: User) {
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        id,
        deleted_at: null
      }
    })

    if (checkUser) {
      if (body.pass_word) {
        const newData = await this.prisma.nguoi_dung.update({
          where: {
            id
          }, data: { ...body, pass_word: bcrypt.hashSync(body.pass_word, 10) }
        })

        const { pass_word, deleted_at, ...rest } = newData

        return {
          message: "Update User Successfully",
          data: rest
        }
      } else {
        const newData = await this.prisma.nguoi_dung.update({
          where: {
            id
          }, data: body
        })

        const { pass_word, deleted_at, ...rest } = newData

        return {
          message: "Update User Successfully",
          data: rest
        }
      }

    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Search User by Name
  async searchUserByName(name: string) {
    const users = await this.prisma.nguoi_dung.findMany({
      where: {
        name: {
          contains: name
        },
        deleted_at: null
      }
    })

    if (users.length > 0) {
      return users.map(user => {
        const { pass_word, deleted_at, ...rest } = user;

        return rest
      })
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Upload Avatar
  async uploadAvatar(file: Express.Multer.File, token: string) {
    const decodeToken = await this.jwtService.decode(token);

    const getUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        id: decodeToken.data.id,
        deleted_at: null
      }
    });

    const avatarUrl = await this.cloudinary.uploadFile(file, 'nguoi-dung').catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    if (getUser) {
      const newData = await this.prisma.nguoi_dung.update({
        where: {
          id: decodeToken.data.id
        }, data: {
          avatar: avatarUrl.url
        }
      })

      const { pass_word, deleted_at, ...rest } = newData

      return {
        message: "Update Avatar Successfully",
        data: rest
      }
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }
}