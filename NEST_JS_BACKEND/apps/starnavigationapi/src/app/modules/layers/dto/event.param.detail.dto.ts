import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PacketTypeEnum } from "../../../enum/packet.type.enum";


/**
 * This is EventParam class
 * 
 * Describes all the fields of EventParam for API 
 * 
 * @ignore
 */
export class EventParamDetailDto {
    @Expose()
    @ApiProperty({
        description: 'id'
    })
    @IsNumber()
    id?: number;
    @Expose()
    @ApiProperty({
        description: 'map id'
    })
    @IsNumber()
    paramId?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'units'
    })
    @IsNotEmpty()
    paramValue?: string;
    @Expose()
    @ApiProperty({
        description: 'packet type'
    })
    @IsNotEmpty()
    packetType?: PacketTypeEnum;
}