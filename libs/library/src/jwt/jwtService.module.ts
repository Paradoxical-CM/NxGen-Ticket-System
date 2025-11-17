import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceConfigAsync } from './jwtService.provider';

@Module({
  imports: [JwtModule.registerAsync(JwtServiceConfigAsync)],
  exports: [JwtModule],
})
export class JwtServiceModule {}
