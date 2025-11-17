import { UserModel, UserTokenModel } from '@app/library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserValidationService {
  constructor(
    @InjectRepository(UserModel, 'postgres')
    private userRepository: Repository<UserModel>,
    @InjectRepository(UserTokenModel, 'postgres')
    private tokenRepository: Repository<UserTokenModel>,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...payload } = user;
      return payload;
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async validateAccessToken(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) return false;
    return true;
  }

  async validateRefreshToken(token: string, id: string): Promise<boolean> {
    const userToken = await this.tokenRepository.findOneBy({ user_uuid: id });
    if (!userToken?.refresh_token.match(token)) return false;
    return true;
  }
}
