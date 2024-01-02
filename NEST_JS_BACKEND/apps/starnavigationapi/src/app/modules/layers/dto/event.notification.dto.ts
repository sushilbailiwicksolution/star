/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ConfirmEnum } from "../../../enum/ConfirmEnum";
import { NotifyEnum } from "../../../enum/notify.enum";
import { ExtendDto } from "./extend.dto";


/**
 * This is EventNotificationDto class
 * @ignore
 */
export class EventNotificationDto {
    @ApiProperty({})
    @Expose()
    id?: number;
}

/**
 * This is EventAssetDto class
 * @ignore
 */
export class EventAssetDto {
    @ApiProperty({})
    @Expose()
    id?: number;
}

/**
 * This is EventNotificationMainDto class
 * @ignore
 */
export class EventNotificationMainDto extends ExtendDto {
    @Expose()
    id?: number;

    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The name of event notification'
    })
    @IsNotEmpty()
    name?: string;

    @Expose()
    @ApiProperty({
        description: 'Is active'
    })
    active?: boolean;

    @Expose()
    @ApiProperty({ type: () => EventAssetDto, isArray: true })
    @IsOptional()
    vehicles?: EventAssetDto[];

    @Expose()
    @ApiProperty({ type: () => EventNotificationDto, isArray: true })
    @IsOptional()
    notifications?: EventNotificationDto[];

    @Expose()
    @ApiProperty({
        enum: ConfirmEnum,
        isArray: false
    })
    @IsNotEmpty()
    notifyEmail?: ConfirmEnum;

    @Expose()
    @ApiProperty({
        description: 'Description'
    })
    description?: string;

    @Expose()
    @ApiProperty({
        description: 'Customer ID'
    })
    customerId?: number;

    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The name of event'
    })
    @IsNotEmpty()
    eventName?: string;

    @IsString()
    @Expose()
    @ApiProperty({
        description: 'Event ID'
    })
    @IsNotEmpty()
    eventId?: string;

    @IsString()
    @Expose()
    @ApiProperty({
        description: 'customer name'
    })
    @IsNotEmpty()
    customerName?: string;
}
