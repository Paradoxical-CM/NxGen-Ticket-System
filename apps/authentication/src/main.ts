import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);

  const config = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('User Authentication API Document')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('authentication', app, documentFactory);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
