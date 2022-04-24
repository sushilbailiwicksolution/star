import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EventSeverityEnum } from "../../../enum/event.severity.enum";
import { NotifyEnum } from "../../../enum/notify.enum";
import { ExtendDto } from "./extend.dto";

export class GeofenceNotificationDto  {
    @ApiProperty({})
    @Expose()
    notificationId?: number;
}
export class GeofenceAssetDto {
    @ApiProperty({})
    @Expose()
    assetId?: number;
}
export class GeofenceDto extends ExtendDto {
    @Expose()
    id?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The name of geofence'
    })
    @IsNotEmpty()
    name?: string;
    @Expose()
    @ApiProperty({
        enum: NotifyEnum,
        isArray: false
    })
    @IsNotEmpty()
    notify?:NotifyEnum;
    @Expose()
    @ApiProperty({ type: () => GeofenceAssetDto, isArray: true })
    @IsOptional()
    vehicles?: Array<GeofenceAssetDto>;
    @Expose()
    @ApiProperty({})
    @IsNotEmpty()
    layerId?: number;
    @Expose()
    @ApiProperty({})
    @IsNotEmpty()
    landmarkId?: number;
    @Expose()
    @ApiProperty({ type: () => GeofenceNotificationDto, isArray: true })
    @IsOptional()
    notifications?: Array<GeofenceNotificationDto>;
    @Expose()
    @ApiProperty({
        description: 'Notify Map'
    })
    notifyMap?: string = "Yes";
    @Expose()
    @ApiProperty({
        description: 'Notify Email'
    })
    notifyEmail?: string = "Yes";
    @Expose()
    @ApiProperty({
        description: 'Description'
    })
    description?: string;
    @Expose()
    @ApiProperty({
        description: 'Min Altitude'
    })
    minAltitude?: number;
    @Expose()
    @ApiProperty({
        description: 'Max Altitude'
    })
    maxAltitude?: number;
    @Expose()
    @ApiProperty({
        description: 'Min Velocity'
    })
    minVelocity?: number;
    @Expose()
    @ApiProperty({
        description: 'Max Altitude'
    })
    maxVelocity?: number;
    @Expose()
    @ApiProperty({
        enum: EventSeverityEnum,
        isArray: false
    })
    @IsNotEmpty()
    eventSeverity?:EventSeverityEnum;
    @Expose()
    @ApiProperty({
        description: 'Schedule Start Time'
    })
    scheduleStartTime?: string;
    @Expose()
    @ApiProperty({
        description: 'Schedule End Time'
    })
    scheduleEndTime?: string;
    @Expose()
    @ApiProperty({
        description: 'Customer ID'
    })
    custumerId?: number;
    @Expose()
    @ApiProperty()
    days?: unknown;

    @Expose()
    @ApiProperty({
        description: 'Buffer Distance'
    })
    bufferDistance?: number;
}