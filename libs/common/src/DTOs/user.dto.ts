import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty()
  @IsStrongPassword({ minLength: 8 })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
