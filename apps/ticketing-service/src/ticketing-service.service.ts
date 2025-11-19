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

  public async retrieveTickets() {
    const ticketRecords = this.ticketRepository.find();
  }
}
