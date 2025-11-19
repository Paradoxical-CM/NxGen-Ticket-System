import { JwtTokenValidation } from '@app/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TicketingService } from './ticketing-service.service';

@Controller()
export class TicketingServiceController {
  constructor(private readonly TicketingService: TicketingService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtTokenValidation)
  getHello(): string {
    return this.TicketingService.getHello();
  }
}
