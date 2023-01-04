import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserTypeEnum } from "../../../enum/user.type.enum";


/**
 * This is AplItems class
 * @ignore
 * Describes all the fields of APlItems for API 
 */
export class AplItemDto {
    @Expose()
    @ApiProperty({
        description: 'map id'
    })
    @IsNumber()
    mapId?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'units'
    })
    @IsNotEmpty()
    units?: string;
    @Expose()
    @ApiProperty({
        description: 'min value'
    })
    @IsNumber()
    minVal?: number;
    @Expose()
    @ApiProperty({
        description: 'max value'
    })
    @IsNumber()
    maxVal?: number;
    @Expose()
    @ApiProperty({
        description: 'threshold'
    })
    @IsNumber()
    thresHold?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'color'
    })
    @IsNotEmpty()
    color?: string;
    @IsBoolean()
    @Expose()
    @ApiProperty({
        description: 'Display option'
    })
    displayOption?: boolean;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'notification'
    })
    @IsNotEmpty()
    notification?: string;
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    severity?: number;
}