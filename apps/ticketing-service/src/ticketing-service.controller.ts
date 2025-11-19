import { PaginationDTO } from '@app/common';
import { JwtTokenValidation } from '@app/guards';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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

  @Get('ticketing-records')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtTokenValidation)
  async getTicketingRecords(
    @Request() req: { user: { id: string } },
    @Query() query: PaginationDTO,
  ) {
    return await this.TicketingService.retrieveTickets(req.user.id, query);
  }
}
