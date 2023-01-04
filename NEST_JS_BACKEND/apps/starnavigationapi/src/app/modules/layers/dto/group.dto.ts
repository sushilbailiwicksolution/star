import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";


/**
 * This is GroupDto class
 * 
 * Describes all the fields of GroupDto for API 
 * @ignore
 */
export class GroupDto {
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'username'
    })
    @IsNotEmpty()
    name?: string;
}