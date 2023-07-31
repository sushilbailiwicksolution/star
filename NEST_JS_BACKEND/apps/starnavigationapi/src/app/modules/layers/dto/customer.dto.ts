import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { string } from "joi";
import { CustomerType } from "../../../enum/user.type.enum";
import { ExtendDto } from "./extend.dto";
import { NewUserDto } from "./newUser.dto";


/**
 * This is CustomerDto class
 * @ignore
 * Describes all the fields of CustomerDto for API 
 */
// export class CustomerDto extends ExtendDto {
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'name'
//     })
//     @IsNotEmpty()
//     name?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'name'
//     })
//     @IsNotEmpty()
//     email?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'address'
//     })
//     @IsNotEmpty()
//     address?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'website'
//     })
//     @IsNotEmpty()
//     website?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'phone number'
//     })
//     @IsNotEmpty()
//     phoneNumber?: string;

//     //Customer type 
//     @Expose()
//     @ApiProperty({
//         description: 'customer type',
//     })
//     @IsNotEmpty()
//     customerType?: CustomerType;

//     @Expose()
//     @ApiProperty({
//         description: 'country code'
//     })
//     @IsNotEmpty()
//     countryCode?: string;
// }



export class CustomerDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    phone?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @ApiProperty()
    @IsBoolean()
    isAdmin: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;
  
    @ApiProperty()
    user?: NewUserDto;
  }














//Trying new customer creation 
export class NewCustomerDto  extends ExtendDto{

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
        description: 'contact'
    })
    @IsNotEmpty()
    contact: string;
    @Expose()
    @ApiProperty({
        description: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'phone'
    })
    @IsNotEmpty()
    phone: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'address'
    })
    @IsNotEmpty()
    address: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'city'
    })
    @IsNotEmpty()
    city: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'state'
    })
    @IsNotEmpty()
    state: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'country'
    })
    @IsNotEmpty()
    country: string;
    @IsBoolean()
    @Expose()
    @ApiProperty({
        description: 'isAdmin'
    })
    isAdmin?: boolean;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'firstname'
    })
    firstName?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'lastname'
    })
    lastName?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'password'
    })
    password?: string;
    @IsEmail()
    @Expose()
    @ApiProperty({
        description: 'email id'
    })
    emailId?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'phone number'
    })
    phoneNumber?: string;
  }
  
