import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { UserModel } from './entity/user/user.entity';

export default class PostgressqlConfig {
  static getPostgressqlConfig(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('SQL_HOST'),
      port: configService.get('SQL_PORT'),
      username: configService.get('SQL_USER'),
      password: configService.get('SQL_PASSWORD'),
      database: configService.get('SQL_DB'),
      entities: [UserModel],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
    };
  }
}

export const PostgressqlConfigAsync: TypeOrmModuleAsyncOptions = {
  name: 'postgres',
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return PostgressqlConfig.getPostgressqlConfig(configService);
  },
  inject: [ConfigService],
};
