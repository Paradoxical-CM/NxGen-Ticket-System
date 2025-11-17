import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import * as fs from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserValidationService } from './user-validation.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private validation: UserValidationService) {
    const publicKey = fs.readFileSync('./encryption-key/public.pem', 'utf-8');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.refresh_token,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      passReqToCallback: true,
      algorithms: ['RS256'],
    });
  }

  async validate(req: Request, payload: any) {
    if (!req?.cookies?.refresh_token)
      throw new UnauthorizedException(`Refresh token is null`);
    const refresh_token: string = req?.cookies?.refresh_token;
    const valid = await this.validation.validateRefreshToken(
      refresh_token,
      payload.id,
    );
    if (valid) return { ...payload, refresh_token };
    return false;
  }
}
