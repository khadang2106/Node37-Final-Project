import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [PhongController],
  providers: [PhongService, JwtService, AuthenticationService],
})
export class PhongModule { }
