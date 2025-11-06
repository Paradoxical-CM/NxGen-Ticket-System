import { UserModel } from '@app/library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserValidationService {
  constructor(
    @InjectRepository(UserModel, 'postgres')
    private userRepository: Repository<UserModel>,
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
}
