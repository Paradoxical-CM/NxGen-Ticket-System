import { UserValidationModule } from '@app/guards/user-validation/user-validation.module';
import { UserModel } from '@app/library';
import { PostgressqlModule } from '@app/library/database/postgressql.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgressqlModule,
    UserValidationModule,
    TypeOrmModule.forFeature([UserModel], 'postgres'),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
