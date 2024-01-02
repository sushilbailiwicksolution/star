import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { StatusEnum } from "../../../enum/status.enum";



/**
 * This is ExtendDto class
 * 
 * Describes all the fields of ExtendedDto
 * 
 * @ignore
 */
export class ExtendDto {
    @Expose()
    id?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'created by'
    })
    @IsNotEmpty()
    createdBy?: string;
    @Expose()
    createdAt?: Date;
    @Expose()
    updatedAt?: Date;
    @Expose()
    status?: StatusEnum;
}