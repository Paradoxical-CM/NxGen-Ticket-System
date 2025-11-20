import { OmitType } from '@nestjs/swagger';
import { TicketDTO } from './ticket.dtos';

export class createTicketDTO extends OmitType(TicketDTO, [
  'ticket_id',
  'date',
  'user',
] as const) {}
