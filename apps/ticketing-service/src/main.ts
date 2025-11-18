import { NestFactory } from '@nestjs/core';
import { TicketingServiceModule } from './ticketing-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketingServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
