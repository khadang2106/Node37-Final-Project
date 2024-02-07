import { Module } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { DatPhongController } from './dat-phong.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/utils/authentication.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [DatPhongController],
  providers: [DatPhongService, JwtService, AuthenticationService],
})
export class DatPhongModule { }
