import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AplItemDto } from "./apl.item.dto.";

/**
 * This is AplDto class
 * @ignore
 * Describes all the fields of APl for API 
 */
export class AplDto {
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'esn'
    })
    @IsNotEmpty()
    esn?: string;
    @Expose()
    @ApiProperty({
        description: 'customer id'
    })
    @IsNumber()
    customerId?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'version'
    })
    @IsNotEmpty()
    version?: string;
    @Expose()
    @ApiProperty()
    @IsOptional()
    @Type(() => AplItemDto)
    aplItems: Array<AplItemDto>;
}