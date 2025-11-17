import { UserValidationModule } from '@app/guards/user-validation/user-validation.module';
import { JwtServiceModule, UserModel } from '@app/library';
import { UserTokenModel } from '@app/library/database/entity/user/user-token.entity';
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
    JwtServiceModule,
    UserValidationModule,
    PostgressqlModule,
    TypeOrmModule.forFeature([UserModel, UserTokenModel], 'postgres'),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
