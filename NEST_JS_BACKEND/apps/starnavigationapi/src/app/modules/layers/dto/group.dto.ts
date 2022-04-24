import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class GroupDto {
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'username'
    })
    @IsNotEmpty()
    name?: string;
}