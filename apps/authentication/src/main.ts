import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('User Authentication API Document')
    .addTag('Authentication')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('authentication', app, documentFactory, {
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
