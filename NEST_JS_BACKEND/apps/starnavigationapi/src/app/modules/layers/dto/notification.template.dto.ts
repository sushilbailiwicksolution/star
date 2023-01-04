import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';


/**
 * This is NotificationTemplateDto class
 * 
 * Describes all the fields of Notification Template for API 
 * @ignore
 */
export class NotificationTemplateDto {
    @Expose()
    id?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The name of template'
    })
    @IsNotEmpty()
    name?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'Subject for a template'
    })
    @IsNotEmpty()
    subject?: string;
    @IsString()
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    body?: string;@IsString()
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
}