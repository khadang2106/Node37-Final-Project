import { Module } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { DatPhongController } from './dat-phong.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [DatPhongController],
  providers: [DatPhongService, JwtService, AuthenticationService],
})
export class DatPhongModule { }
