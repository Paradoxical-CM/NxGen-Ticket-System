import { UserModel, UserTokenModel } from '@app/library';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserModel, 'postgres')
    private userRepository: Repository<UserModel>,
    @InjectRepository(UserTokenModel, 'postgres')
    private tokenRepository: Repository<UserTokenModel>,
    private jwtService: JwtService,
  ) {}

  private async PasswordHash(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async login(user: { id: string; username: string }) {
    try {
      const access_token = await this.jwtService.signAsync(user);
      const refresh_token = await this.jwtService.signAsync(user, {
        expiresIn: '7d',
        algorithm: 'RS256',
      });
      await this.tokenRepository.save({
        user_uuid: user.id,
        access_token,
        refresh_token,
      });
      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(
        `error -> authentication service -> login, error: ${error}`,
      );
    }
  }

  public async registration(body: { username: string; password: string }) {
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
    } catch (error) {
      throw new InternalServerErrorException(
        `error -> authentication service -> registration, error: ${error}`,
      );
    }
  }

  public async refresh(user_id: string, refresh_token: string) {
    const userToken = await this.tokenRepository.findOne({
      where: { user_uuid: user_id },
    });
    if (!userToken?.refresh_token)
      throw new UnauthorizedException(
        `User UUID: ${userToken?.user_uuid} does not have a refresh token`,
      );
    const valid = bcrypt.compare(refresh_token, userToken?.refresh_token);
    if (!valid)
      throw new UnauthorizedException(
        `User UUID: ${userToken?.user_uuid} does not have a valid refresh token`,
      );
    const user = await this.userRepository.findOneBy({
      id: userToken.user_uuid,
    });
    if (!user) throw new UnauthorizedException('User does not exist');
    const { id, username } = user;
    const newAccessToken = await this.jwtService.signAsync({
      id,
      username,
    });
    const newRefreshToken = await this.jwtService.signAsync(
      { id, username },
      {
        expiresIn: '7d',
        algorithm: 'RS256',
      },
    );

    await this.tokenRepository.update(
      { user_uuid: id },
      {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      },
    );

    return {
      newAccessToken,
      newRefreshToken,
    };
  }
}
