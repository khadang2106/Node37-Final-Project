import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [PhongController],
  providers: [PhongService, JwtService, AuthenticationService],
})
export class PhongModule { }
