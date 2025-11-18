import { Module } from '@nestjs/common';
import { TicketingServiceController } from './ticketing-service.controller';
import { TicketingServiceService } from './ticketing-service.service';

@Module({
  imports: [],
  controllers: [TicketingServiceController],
  providers: [TicketingServiceService],
})
export class TicketingServiceModule {}
