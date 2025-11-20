import { RetrieveTicketDTO } from '@app/common';
import { createTicketDTO } from '@app/common/DTOs/create-ticket.dto';
import { JwtTokenValidation } from '@app/guards';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
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
  getHello(): object {
    return this.TicketingService.getHello();
  }

  @Get('get-ticketing-records')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtTokenValidation)
  async getTicketingRecords(
    @Request() req: { user: { id: string } },
    @Query() searchquery: RetrieveTicketDTO,
  ) {
    return await this.TicketingService.retrieveTickets(
      req.user.id,
      searchquery,
    );
  }

  @Post('create-ticket')
  @ApiBearerAuth()
  @UseGuards(JwtTokenValidation)
  async createTicket(
    @Request() req: { user: { id: string } },
    @Body() form: createTicketDTO,
  ) {
    return await this.TicketingService.createTicket(form, req.user.id);
  }
}
