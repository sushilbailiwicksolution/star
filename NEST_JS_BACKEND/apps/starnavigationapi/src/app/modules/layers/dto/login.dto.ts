import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * This is LoginDto class
 * 
 * Describes all the fields of Login for API 
 * @ignore 
*/
export class LoginDto {
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'username'
    })
    @IsNotEmpty()
    username?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'password'
    })
    @IsNotEmpty()
    password?: string;
    
}