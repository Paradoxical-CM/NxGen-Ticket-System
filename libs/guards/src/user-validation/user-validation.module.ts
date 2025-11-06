import { PostgressqlModule, UserModel } from '@app/library';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local-strategy';
import { UserValidationService } from './user-validation.service';

@Module({
  imports: [
    PostgressqlModule,
    TypeOrmModule.forFeature([UserModel], 'postgres'),
    PassportModule,
  ],
  providers: [LocalStrategy, UserValidationService],
})
export class UserValidationModule {}
