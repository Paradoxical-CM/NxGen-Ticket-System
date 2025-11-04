import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgressqlConfigAsync } from './postgressql.provider';
@Module({
  imports: [TypeOrmModule.forRootAsync(PostgressqlConfigAsync)],
  exports: [PostgressqlModule],
})
export class PostgressqlModule {}
