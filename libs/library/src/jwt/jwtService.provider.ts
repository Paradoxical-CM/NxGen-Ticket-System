import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import * as fs from 'fs';

const publicKey = fs.readFileSync('./encryption-key/public.pem', 'utf-8');
const privateKey = fs.readFileSync('./encryption-key/private.pem', 'utf-8');

export default class JwtServiceConfig {
  static getJwtServiceConfig(configService: ConfigService): JwtModuleOptions {
    return {
      global: true,
      privateKey,
      publicKey,
      signOptions: {
        expiresIn: '15M',
        algorithm: 'RS256',
      },
      verifyOptions: {
        algorithms: ['RS256'],
      },
    };
  }
}

export const JwtServiceConfigAsync: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<JwtModuleOptions> => {
    return JwtServiceConfig.getJwtServiceConfig(configService);
  },
  inject: [ConfigService],
};
