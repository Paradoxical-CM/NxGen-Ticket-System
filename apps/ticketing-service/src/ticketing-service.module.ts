import { UserValidationModule } from '@app/guards';
import { JwtServiceModule, PostgressqlModule, TicketModel } from '@app/library';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketingServiceController } from './ticketing-service.controller';
import { TicketingService } from './ticketing-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtServiceModule,
    UserValidationModule,
    PostgressqlModule,
    TypeOrmModule.forFeature([TicketModel], 'postgres'),
  ],
  controllers: [TicketingServiceController],
  providers: [TicketingService],
})
export class TicketingServiceModule {}
