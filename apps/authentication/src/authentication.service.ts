import { UserModel } from '@app/library';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserModel, 'postgres')
    private userRepository: Repository<UserModel>,
  ) {}

  async PasswordHash(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async registration(body: { username: string; password: string }) {
    const { username, password } = body;
    try {
      const existingUser = await this.userRepository.findOne({
        where: { username },
      });
      if (existingUser) {
        throw new BadRequestException('existing user');
      }
      const hashPassword = await this.PasswordHash(password);
      await this.userRepository.save({
        username,
        password: hashPassword,
      });
      return 'User successfully registered';
    } catch {
      console.error('error, registration fault');
    }
  }
}
