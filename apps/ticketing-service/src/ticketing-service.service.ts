import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketingServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
