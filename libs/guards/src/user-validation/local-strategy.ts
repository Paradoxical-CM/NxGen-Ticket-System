import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserValidationService } from './user-validation.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validation: UserValidationService) {
    super();
  }

  async validate(username: string, passport: string) {
    return await this.validation.validateUser(username, passport);
  }
}
