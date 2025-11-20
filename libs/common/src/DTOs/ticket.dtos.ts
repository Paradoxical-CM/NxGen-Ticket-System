import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TicketDTO {
  @ApiProperty()
  @IsInt()
  ticket_id: number;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  caller_name: string;

  @ApiProperty()
  @IsNumber()
  caller_contact: number;

  @ApiProperty()
  @IsNumber()
  onsite_contact: number;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({
    example: '2025-03-14',
    description: 'Singapore date only (YYYY-MM-DD)',
  })
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  fault_description: string;

  @ApiProperty()
  @IsString()
  affected_extension: string;

  @ApiProperty()
  @IsString()
  affected_phone_type: string;

  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  remark: string;
}
