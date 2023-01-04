import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDateString, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { PacketTypeEnum } from "../../../enum/packet.type.enum";
import { EventParamDetailDto } from "./event.param.detail.dto";


/**
 * This is EventDetails class
 * 
 * @ignore
 */
export class EventDetailDto {
    /**
    * Describes all the fields of EventDetails for API 

     */

    //newly added flightDetails

    @Expose()
    @ApiProperty({
        description: 'fuel'
    })
    @IsNumber()
    fuel?: number;

    @IsString()
    @Expose()
    @ApiProperty({
        description: 'ground speed'
    })
    @IsNotEmpty()
    groundSpeed?: string;
    
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'air speed'
    })
    @IsNotEmpty()
    airSpeed?: string;
    
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'flight id'
    })
    @IsNotEmpty()
    flightId?: string;
    

    @IsString()
    @Expose()
    @ApiProperty({
        description: 'esn'
    })
    @IsNotEmpty()
    esn?: string;
    @Expose()
    @ApiProperty({
        description: 'packet type'
    })
    @IsNotEmpty()
    packetType?: PacketTypeEnum;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'aircraft id'
    })
    @IsNotEmpty()
    aircraftId?: string;
    @Expose()
    @ApiProperty({
        description: 'customer id'
    })
    @IsDateString()
    scheduledDepartureTime?: Date;
    @Expose()
    @ApiProperty({
        description: 'gps latitude'
    })
    @IsNumber()
    gpsLatitude?: number;
    @Expose()
    @ApiProperty({
        description: 'gps longitude'
    })
    @IsNumber()
    gpsLongitude?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'altitude'
    })
    @IsNotEmpty()
    altitude?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'speed'
    })
    @IsNotEmpty()
    speed?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'heading'
    })
    @IsNotEmpty()
    heading?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'start time'
    })
    @IsNotEmpty()
    startTime?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'end time'
    })
    @IsNotEmpty()
    endTime?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'stop time'
    })
    @IsNotEmpty()
    stopTime?: string;
    @Expose()
    @ApiProperty({
        description: 'param count'
    })
    @IsNumber()
    paramCount?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'event id'
    })
    @IsNotEmpty()
    eventId?: string;
    @Expose()
    @ApiProperty()
    @Type(() => EventParamDetailDto)
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    eventParamDetails: Array<EventParamDetailDto>;
}