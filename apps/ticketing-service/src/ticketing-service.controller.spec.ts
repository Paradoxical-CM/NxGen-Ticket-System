import { Test, TestingModule } from '@nestjs/testing';
import { TicketingServiceController } from './ticketing-service.controller';
import { TicketingService } from './ticketing-service.service';

describe('TicketingServiceController', () => {
  let ticketingServiceController: TicketingServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketingServiceController],
      providers: [TicketingService],
    }).compile();

    ticketingServiceController = app.get<TicketingServiceController>(
      TicketingServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ticketingServiceController.getHello()).toBe('Hello World!');
    });
  });
});
