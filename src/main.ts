import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(express.static("."))

  const config = new DocumentBuilder().setTitle("Node 37 - Final Project - AirBnb").addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document);

  await app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });
}
bootstrap();
