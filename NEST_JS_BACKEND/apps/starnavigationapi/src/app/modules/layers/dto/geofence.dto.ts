/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ConfirmEnum } from "../../../enum/ConfirmEnum";
import { EventSeverityEnum } from "../../../enum/event.severity.enum";
import { NotifyEnum } from "../../../enum/notify.enum";
import { ExtendDto } from "./extend.dto";


/**
 * This is geofenceNotificationDto class
 * @ignore
 * @param {number} id 
 */
export class GeofenceNotificationDto  {
    @ApiProperty({})
    @Expose()
    id?: number;
}
/**
 * This is GeofenceAsset class
 * @ignore
 * Describes all the fields of GeofenceAsset for api
 *  @param {number} id
 */
export class GeofenceAssetDto {
    @ApiProperty({})
    @Expose()
    id?: number;
}

/**
 * This is GeofenceDto class
 * 
 * @ignore
 */
export class GeofenceDto extends ExtendDto {

    /**
     * @param {number} id
     */
    @Expose()
    id?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The name of geofence'
    })
    /**
     * @param {string}name 
     */
    @IsNotEmpty()
    name?: string;
    @Expose()
    @ApiProperty({
        enum: NotifyEnum,
        isArray: false
    })
    /**
     * @param
     */
    @IsNotEmpty()
    notify?:NotifyEnum;
    @Expose()
    @ApiProperty({ type: () => GeofenceAssetDto, isArray: true })
    @IsOptional()
    /**
     * Vehicles stored in array 
     */
    vehicles?: Array<GeofenceAssetDto>;
    @Expose()
    @ApiProperty({})
    @IsNotEmpty()
    /**
     * Layer id 
     */
    layerId?: number;
    @Expose()
    @ApiProperty({})
    @IsNotEmpty()
    /**
     * Landmark id 
     */
    landmarkId?: number;
    @Expose()
    @ApiProperty({ type: () => GeofenceNotificationDto, isArray: true })
    @IsOptional()
    /**
     * Nofitication in array 
     */
    notifications?: Array<GeofenceNotificationDto>;
    @Expose()
    @ApiProperty({
        enum: ConfirmEnum,
        isArray: false
    })
    @IsNotEmpty()
    /**
     * NotifyMap 
     */
    notifyMap?: ConfirmEnum;
    @Expose()
    @ApiProperty({
        enum: ConfirmEnum,
        isArray: false
    })
    /**
     * Notifyemail
     */
    @IsNotEmpty()
    notifyEmail?: ConfirmEnum;
    @Expose()
    @ApiProperty({
        description: 'Description'
    })
    /**
     * Description 
     */
    description?: string;
    @Expose()
    @ApiProperty({
        description: 'Min Altitude'
    })
    /**
     * Altitude minimum
     */
    minAltitude?: number;
    @Expose()
    @ApiProperty({
        description: 'Max Altitude'
    })

    /**
     * Max Altitude 
     */
    maxAltitude?: number;
    @Expose()
    @ApiProperty({
        description: 'Min Velocity'
    })

    /**
     * Min Velocity 
     */
    minVelocity?: number;
    @Expose()
    @ApiProperty({
        description: 'Max Altitude'
    })
    /**
     * Max Velocity 
     */
    maxVelocity?: number;
    @Expose()
    @ApiProperty({
        enum: EventSeverityEnum,
        isArray: false
    })
    @IsNotEmpty()
    /**
     * Event severity found from enum 
     */
    eventSeverity?:EventSeverityEnum;
    @Expose()
    @ApiProperty({
        description: 'Schedule Start Time'
    })
    /**
     * Schedule start time 
     */
    scheduleStartTime?: string;
    @Expose()
    @ApiProperty({
        description: 'Schedule End Time'
    })
    /**
     * Schedule end time 
     */
    scheduleEndTime?: string;
    @Expose()
    @ApiProperty({
        description: 'Customer ID'
    })
    /**
     * Customer id 
     */
    customerId?: number;
    @Expose()
    @ApiProperty({})
    /**
     * Days in array 
     */
    days?: Array<any>;

    @Expose()
    @ApiProperty({
        description: 'Buffer Distance'
    })
    /**
     * Buffer distance 
     */
    bufferDistance?: number = 0;
}