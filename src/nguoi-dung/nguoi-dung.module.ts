import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [NguoiDungController],
  providers: [NguoiDungService, JwtService, AuthenticationService],
})
export class NguoiDungModule { }
