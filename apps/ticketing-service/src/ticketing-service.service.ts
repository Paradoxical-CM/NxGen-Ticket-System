import { PaginationDTO } from '@app/common';
import { TicketModel } from '@app/library';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(TicketModel, 'postgres')
    private ticketRepository: Repository<TicketModel>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async retrieveTickets(id: string, pagination: PaginationDTO) {
    return await this.ticketRepository.find({
      where: { user: { id } },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      relations: {
        user: true,
      },
    });
  }
}
