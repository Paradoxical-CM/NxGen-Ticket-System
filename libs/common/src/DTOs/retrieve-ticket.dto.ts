import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDTO } from './pagination.dto';
import { TicketDTO } from './ticket.dtos';

export class RetrieveTicketDTO extends IntersectionType(
  PartialType(PickType(TicketDTO, ['company', 'caller_name', 'date'] as const)),
  PaginationDTO,
) {}
