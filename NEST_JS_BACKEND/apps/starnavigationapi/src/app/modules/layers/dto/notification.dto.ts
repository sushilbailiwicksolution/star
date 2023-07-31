import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NotificationTypeEnum } from '../../../enum/notification.type.enum';
import { ExtendDto } from './extend.dto';
import { NotificationTemplateDto } from './notification.template.dto';


/**
 * This is NotificationEmailDto class
 * 
 * Describes all the fields of NotificationEmailDto for API 
 * 
 * @ignore
 */
export class NotificationEmailDto  {
    @Expose()
    @ApiProperty({})
    email?: string;
}
/**
 * This is NotificationUserDto class
 * 
 * Describes all the fields of NotificationUserDto for API 
 * @param {number}id
 * @ignore
 */
export class NotificationUserDto {
    @ApiProperty({})
    @Expose()
    id?: number;
}
/**
 * This is NotificationDto class
 * 
 * @ignore
 */
export class NotificationDto extends ExtendDto {

    /**
     * Describes all the fields of NotificationDto for API 
     */
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