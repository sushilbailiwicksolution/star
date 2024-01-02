import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class ReportNotificationDto {
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'Created By'
    })
    @IsNotEmpty()
    createdBy: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'Customer Name'
    })
    @IsNotEmpty()
    customerName: string;

    @IsNumber()
    @Expose()
    @ApiProperty({
        description: 'Customer Id'
    })
    @IsNotEmpty()
    customerId: number;

    @IsArray()
    @Expose()
    @ApiProperty({
        description: 'Notifications Ids'
    })
    @IsNotEmpty()
     notifications: Array<{ id: number }>;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The report name'
    })
    @IsNotEmpty()
    report: string;
  }