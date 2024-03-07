import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Login, Register } from './dto/auth.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) { }

  prisma = new PrismaClient();

  async login(body: Login) {
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: body.email,
        deleted_at: null
      },
    });

    if (checkUser) {
      if (bcrypt.compareSync(body.pass_word, checkUser.pass_word)) {

        const userData = {
          id: checkUser.id,
          email: checkUser.email,
          name: checkUser.name,
          phone: checkUser.phone,
          birth_day: checkUser.birth_day,
          avatar: checkUser.avatar,
          gender: checkUser.gender,
          role: checkUser.role
        };

        const token = await this.jwtService.signAsync({
          data: {
            id: checkUser.id
          }
        }, { expiresIn: "1d", secret: "SECRET" });

        return { userData, token };
      } else {
        throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED)
      }
    } else {
      throw new HttpException('Incorrect Email', HttpStatus.UNAUTHORIZED)
    }
  }

  async register(body: Register): Promise<nguoi_dung> {
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: { email: body.email, deleted_at: null },
    });

    if (checkUser) {
      throw new HttpException("Email existed!", HttpStatus.BAD_REQUEST)
    }

    const { email, pass_word, name, phone, birth_day, gender } = body;

    const newUser = await this.prisma.nguoi_dung.create({
      data: {
        email,
        pass_word: bcrypt.hashSync(pass_word, 10),
        name,
        phone,
        birth_day,
        gender,
        role: "USER",
      }
    });

    return newUser
  }

}
