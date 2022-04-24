import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NotificationTypeEnum } from '../../../enum/notification.type.enum';
import { ExtendDto } from './extend.dto';
import { NotificationTemplateDto } from './notification.template.dto';

export class NotificationEmailDto  {
    @Expose()
    @ApiProperty({})
    email?: string;
}
export class NotificationUserDto {
    @ApiProperty({})
    @Expose()
    id?: number;
}
export class NotificationDto extends ExtendDto {
    @Expose()
    id?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The name of notification'
    })
    @IsNotEmpty()
    name?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'Timezone for notification'
    })
    @IsNotEmpty()
    timezone?: string;
    @Expose()
    @ApiProperty({
        enum: NotificationTypeEnum,
        isArray: false
    })
    @IsNotEmpty()
    type?: NotificationTypeEnum;
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    customerId?: number;
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    emailTemplateId?: number;
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    smsTemplateId?: number;
    @Expose()
    @ApiProperty({ type: () => NotificationEmailDto, isArray: true })
    @IsOptional()
    emails: Array<NotificationEmailDto>;
    @Expose()
    @ApiProperty({ type: () => NotificationUserDto, isArray: true })
    @IsOptional()
    users: Array<NotificationUserDto>;
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    createdBy?: string;
    @Expose()
    createdAt?: Date;
    @Expose()
    updatedAt?: Date;
    @Expose()
    updatedBy?: string;
    @Expose()
    @Type(() => NotificationTemplateDto)
    emailTemplate?: NotificationTemplateDto;
    @Expose()
    @Type(() => NotificationTemplateDto)
    smsTemplate?: NotificationTemplateDto;
}