import { Controller, Get } from '@nestjs/common';
import { TicketingServiceService } from './ticketing-service.service';

@Controller()
export class TicketingServiceController {
  constructor(private readonly ticketingServiceService: TicketingServiceService) {}

  @Get()
  getHello(): string {
    return this.ticketingServiceService.getHello();
  }
}
