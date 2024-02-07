import { Module } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { BinhLuanController } from './binh-luan.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [BinhLuanController],
  providers: [BinhLuanService, JwtService, AuthenticationService],
})
export class BinhLuanModule { }
