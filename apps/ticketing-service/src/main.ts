import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { TicketingServiceModule } from './ticketing-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketingServiceModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ticketing Service')
    .setDescription('Ticketing API Document')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ticketing', app, documentFactory, {
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
