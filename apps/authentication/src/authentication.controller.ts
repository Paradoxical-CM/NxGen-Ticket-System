import { UserValidation } from '@app/guards';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { UserDto } from './dtos/user.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @ApiBody({ type: UserDto })
  @UseGuards(UserValidation)
  async signIn(@Request() req: any) {
    console.log(req.user);
  }

  @ApiTags('register')
  @Post('register')
  async register(@Body() body: UserDto) {
    const response = this.authenticationService.registration(body);
    return {
      status: HttpStatus.CREATED,
      message: response,
    };
  }
}
