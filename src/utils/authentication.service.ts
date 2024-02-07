import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(private jwtService: JwtService) { }

    prisma = new PrismaClient();

    async authenticateUser(token: string, requiredRole: string) {
        const decodeToken = await this.jwtService.decode(token);
        const user = await this.prisma.nguoi_dung.findFirst({
            where: {
                id: decodeToken.data.id
            }
        });

        if (!user || user.role !== requiredRole) {
            throw new HttpException("Permission denied!", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}