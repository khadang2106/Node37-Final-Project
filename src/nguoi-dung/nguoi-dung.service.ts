import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthenticationService } from 'src/utils/authentication.service';
import { User } from './entities/nguoi-dung.entity';
import * as bcrypt from "bcrypt"

@Injectable()
export class NguoiDungService {
  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private cloudinary: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  // Get all users
  async findAll(): Promise<nguoi_dung[]> {
    const users = await this.prisma.nguoi_dung.findMany();

    const modifiedUsers = users.map(users => ({
      ...users, pass_word: ""
    }))

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
        role
      }
    })
    return {
      message: "Create New User Successfully",
      data: {
        ...newUser,
        pass_word: ''
      }
    }
  }

  // Delete user
  async deleteUser(id: number, token: string) {
    await this.authenticationService.authenticateUser(token, "ADMIN");

    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        id
      }
    })
    if (checkUser) {
      const checkUserComments = await this.prisma.binh_luan.findMany({
        where: {
          ma_nguoi_binh_luan: id
        }
      })

      if (checkUserComments) {
        await this.prisma.binh_luan.deleteMany({
          where: {
            ma_nguoi_binh_luan: id
          }
        })
      }

      await this.prisma.nguoi_dung.delete({
        where: {
          id
        }
      })

      return "Delete User Successfully"
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Get User By Id
  async findUserById(id: number): Promise<nguoi_dung> {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        id
      }
    })

    if (user) {
      return { ...user, pass_word: "" }
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Update User
  async updateUser(id: number, body: User) {
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        id
      }
    })

    if (checkUser) {
      const newData = await this.prisma.nguoi_dung.update({
        where: {
          id
        }, data: { ...body, pass_word: bcrypt.hashSync(body.pass_word, 10) }
      })

      return {
        message: "Update User Successfully",
        data: { ...newData, pass_word: "" }
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
        }
      }
    })

    if (users.length > 0) {
      return users.map(user => ({ ...user, pass_word: "" }))
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }

  // Upload Avatar
  async uploadAvatar(file: Express.Multer.File, token: string) {
    const decodeToken = await this.jwtService.decode(token);

    const getUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        id: decodeToken.data.id
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

      return {
        message: "Update Avatar Successfully",
        data: { ...newData, pass_word: "" }
      }
    } else {
      throw new HttpException("User not existed", HttpStatus.NOT_FOUND)
    }
  }
}