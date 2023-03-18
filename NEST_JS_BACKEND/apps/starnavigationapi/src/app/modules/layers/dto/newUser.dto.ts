import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserTypeEnum } from '../../../enum/user.type.enum';
import { ExtendDto } from './extend.dto';

export class NewUserDto extends ExtendDto {
  @ApiProperty()
  accountType?: UserTypeEnum;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  canChangePassword: boolean;

  @ApiProperty()
  @IsOptional()
  createdBy?: string;

  @ApiProperty()
  customerId?: number;

  @ApiProperty()
  email_id?: string;

  @ApiProperty()
  expires_on?: string;

  @ApiProperty()
  firstname?: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty()
  login_id?: string;

  @ApiProperty()
  neverExpire?: boolean;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  phone_no?: string;

  @ApiProperty()
  username?: string;
}
