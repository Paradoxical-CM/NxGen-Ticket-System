import { RetrieveTicketDTO } from '@app/common';
import { createTicketDTO } from '@app/common/DTOs/create-ticket.dto';
import { TicketModel } from '@app/library';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Between, ILike, Repository } from 'typeorm';

@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(TicketModel, 'postgres')
    private ticketRepository: Repository<TicketModel>,
  ) {}

  getHello(): object {
    return { message: 'Hello World' };
  }

  public async retrieveTickets(id: string, searchquery: RetrieveTicketDTO) {
    const where: any = {
      user: { id },
    };

    if (searchquery.company) where.company = ILike(`${searchquery.company}%`);
    if (searchquery.caller_name)
      where.caller_name = ILike(`${searchquery.caller_name}%`);
    if (searchquery.date) {
      const startDate = DateTime.fromISO(searchquery.date, {
        zone: 'Asia/Singapore',
      })
        .startOf('day')
        .toUTC()
        .toJSDate();

      const endDate = DateTime.fromISO(searchquery.date, {
        zone: 'Asia/Singapore',
      })
        .endOf('day')
        .toUTC()
        .toJSDate();

      where.datetime = Between(startDate, endDate);
    }

    return await this.ticketRepository.find({
      where,
      skip: (searchquery.page - 1) * searchquery.limit,
      take: searchquery.limit,
      relations: {
        user: true,
      },
    });
  }

  public async createTicket(ticket: createTicketDTO, user_uuid: string) {
    const createdAt = DateTime.now()
      .setZone('Asia/Singapore')
      .toUTC()
      .toJSDate();

    return await this.ticketRepository.save({
      company: ticket.company,
      caller_name: ticket.caller_name,
      caller_contact: ticket.caller_contact,
      onsite_contact: ticket.onsite_contact,
      address: ticket.address,
      datetime: createdAt,
      fault_description: ticket.fault_description,
      affected_extension: ticket.affected_extension,
      affected_phone_type: ticket.affected_phone_type,
      remark: ticket.remark,
      user: { id: user_uuid },
    });
  }

  public async updateTicket() {}
}
