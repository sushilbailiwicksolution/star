import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'newFirstName' })
  @IsString()
  firstname?: string;

  @ApiProperty({ example: 'newLastName' })
  @IsString()
  lastname?: string;

  @ApiProperty({ example: 'newEmail@email.com' })
  @IsString()
  email_id?: string;

  @ApiProperty({ example: 'newPhoneNo' })
  @IsString()
  phone_no?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  active?: boolean;
}
