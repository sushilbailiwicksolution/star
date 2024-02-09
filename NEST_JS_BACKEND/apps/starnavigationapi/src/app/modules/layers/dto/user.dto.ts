import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { UserTypeEnum } from "../../../enum/user.type.enum";
import { ExtendDto } from "./extend.dto";


/**
 * This is User Dto class
 * @ignore
 * Describes all the fields of UserDto for API 
 */
export class UserDto extends ExtendDto{
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
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'lastname'
    })
    @IsNotEmpty()
    lastname?: string;
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    accountType?: UserTypeEnum;
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    customerId?: number;
}