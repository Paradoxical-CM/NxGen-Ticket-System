import {
  JwtRefreshGuard,
  JwtTokenValidation,
  UserValidation,
} from '@app/guards';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Request as expressRequest, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { UserDto } from './dtos/user.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @ApiBody({ type: UserDto })
  @UseGuards(UserValidation)
  async signIn(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token } =
      await this.authenticationService.login(req.user);

    res.cookie('refresh_token', refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
    });

    return {
      access_token,
    };
  }

  @Post('register')
  async register(@Body() body: UserDto) {
    const response = await this.authenticationService.registration(body);
    return {
      status: HttpStatus.CREATED,
      message: response,
    };
  }

  @Get('/Hello')
  @ApiBearerAuth()
  @UseGuards(JwtTokenValidation)
  hello() {
    return 'Hello World';
  }

  @Post('/refresh')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @Req() request: expressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!request.user) throw new UnauthorizedException();
    const { id, refresh_token } = request.user as {
      id: string;
      refresh_token: string;
    };
    const { newAccessToken, newRefreshToken } =
      await this.authenticationService.refresh(id, refresh_token);

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token: newAccessToken };
  }
}
