import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PaginationDTO {
  @ApiProperty()
  @IsInt()
  page: number;

  @ApiProperty()
  @IsInt()
  limit: number;
}
