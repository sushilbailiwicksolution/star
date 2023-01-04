import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { ExtendDto } from "./extend.dto";


/**
 * This is CustomerDto class
 * @ignore
 * Describes all the fields of CustomerDto for API 
 */
export class CustomerDto extends ExtendDto {
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'name'
    })
    @IsNotEmpty()
    name?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'name'
    })
    @IsNotEmpty()
    email?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'address'
    })
    @IsNotEmpty()
    address?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'website'
    })
    @IsNotEmpty()
    website?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'phone number'
    })
    @IsNotEmpty()
    phoneNumber?: string;
    @Expose()
    @ApiProperty({
        description: 'country code'
    })
    @IsNotEmpty()
    countryCode?: string;
}