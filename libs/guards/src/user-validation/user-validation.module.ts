import { PostgressqlModule, UserModel, UserTokenModel } from '@app/library';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt-strategy';
import { LocalStrategy } from './local-strategy';
import { RefreshJwtStrategy } from './refresh-jwt-strategy';
import { UserValidationService } from './user-validation.service';

@Module({
  imports: [
    PostgressqlModule,
    TypeOrmModule.forFeature([UserModel, UserTokenModel], 'postgres'),
    PassportModule,
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    RefreshJwtStrategy,
    UserValidationService,
  ],
})
export class UserValidationModule {}
