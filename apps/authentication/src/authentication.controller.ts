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

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
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

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @Req() request: expressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!request.user) throw new UnauthorizedException();
    const { id } = request.user as {
      id: string;
    };
    const { newAccessToken, newRefreshToken } =
      await this.authenticationService.refreshTokens(id);

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token: newAccessToken };
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtTokenValidation)
  async logout(
    @Req() request: expressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = request.cookies?.refresh_token;
    if (!refreshToken) throw new UnauthorizedException('Empty refresh token');

    res.clearCookie('refresh_token');

    return await this.authenticationService.invalidateRefreshToken(
      refreshToken,
    );
  }

  @Get('Hello')
  @ApiBearerAuth()
  @UseGuards(JwtTokenValidation)
  hello() {
    return { message: 'Hello World' };
  }
}
