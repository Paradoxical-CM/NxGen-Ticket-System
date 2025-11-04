import { Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  getHello(): string {
    return this.authenticationService.getHello();
  }

  @Post()
  async signIn() {}
}
