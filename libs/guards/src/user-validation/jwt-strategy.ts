import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserValidationService } from './user-validation.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private validation: UserValidationService) {
    const publicKey = fs.readFileSync('./encryption-key/public.pem', 'utf-8');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: publicKey,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: any) {
    const access_token: string = req.headers['authorization'].replace(
      'Bearer ',
      '',
    );
    return await this.validation.validateAccessToken(payload.id, access_token);
  }
}
