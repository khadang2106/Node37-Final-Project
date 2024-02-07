import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { PhongModule } from './phong/phong.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, ViTriModule, NguoiDungModule, PhongModule, DatPhongModule, BinhLuanModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
