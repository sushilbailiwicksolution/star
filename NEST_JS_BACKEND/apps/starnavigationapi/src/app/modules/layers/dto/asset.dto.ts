import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ExtendDto } from './extend.dto';



/**
 * This is AssetDto class
 * @ignore
 * Describes all the fields of AssetDto for API 
 */
export class AssetDto extends ExtendDto {

    /**
     *Asset esn field . It is of string type
     */
    prototype?: any;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'asset esn'
    })

    /**
     * Vehicle type . It stores string 
     */
    @IsNotEmpty()
    esn?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'vehicle type'
    })
    /**
     * Device type , store string 
     */
    @IsNotEmpty()
    vehicletype?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'device type'
    })
    @IsNotEmpty()
    deviceType?: string;

    /**
     * Country id, stores number type
     */
    @Expose()
    @ApiProperty({
        description: 'country id'
    })
    @IsNumber()
    countryId?: number;
    @Expose()

    /**
     * Customer id , stores number 
     */
    @ApiProperty({
        description: 'customer id'
    })
    @IsNumber()
    customerId?: number;
    @IsString()
    @Expose()
    /**
     * Alias, stores string 
     */
    @ApiProperty({
        description: 'alias'
    })
    @IsNotEmpty()
    alias?: string;
    @IsString()
    @Expose()
    /**
     * Description stores string 
     */
    @ApiProperty({
        description: 'description'
    })
    description?: string;
    @Expose()

    /**
     * Stores symbol stroke size 
     */
    @ApiProperty({
        description: 'Symbol stroke size'
    })
    @IsNumber()
    symbolStrokeSize?: number;
    @IsString()
    @Expose()

    /**
     * Symbol stroke color 
     */
    @ApiProperty({
        description: 'symbol stroke color'
    })
    @IsNotEmpty()
    symbolStrokeColor?: string;
    @IsString()
    @Expose()
    /**
     * Track color 
     */
    @ApiProperty({
        description: 'track color'
    })
    @IsNotEmpty()
    trackColor?: string;
    @IsString()
    @Expose()
    /**
     * Symbol color
     */
    @ApiProperty({
        description: 'symbol color'
    })
    @IsNotEmpty()
    symbolColor?: string;
    @IsString()
    @Expose()
    /**
     * Name of asset 
     */
    @ApiProperty({
        description: 'name of asset'
    })
    @IsNotEmpty()
    name?: string;
    @Expose()
    /**
     * Symbol size 
     */
    @ApiProperty({
        description: 'Symbol size'
    })
    @IsNumber()
    symbolSize?: number;
    @Expose()

    /**
     * track width
     */
    @ApiProperty({
        description: 'Track width'
    })
    @IsNumber()
    trackwidth?: number;
    @Expose()

    /**
     * Symbol stroke size
     */
    @ApiProperty({
        description: 'Symbol stroke size'
    })
    @IsBoolean()
    twoWayMessaging?: boolean;
    @Expose()
    /**
     * Two way message max length 
     */
    @ApiProperty({
        description: 'two way message max length'
    })
    @IsNumber()
    twoWayMessageMaxLength?: number;
    @Expose()
    /**
     * Web link 
     */
    @ApiProperty({
        description: 'Web link'
    })
    @IsNotEmpty()
    @IsString()
    weblink?: string;
    @IsString()
    @Expose()
    /**
     * Asset serial number 
     */
    @ApiProperty({
        description: 'asset serial number'
    })
    @IsNotEmpty()
    assetSerialNumber?: string;
    @IsString()
    @Expose()

    /**
     * Asset registration number 
     */
    @ApiProperty({
        description: 'asset registration number'
    })
    @IsNotEmpty()
    assetRegistrationNumber?: string;
    @IsString()
    @Expose()
    /**
     * Asset make 
     */
    @ApiProperty({
        description: 'asset make'
    })
    @IsNotEmpty()
    assetMake?: string;
    @IsString()
    @Expose()

    /**
     * Asset model
     */
    @ApiProperty({
        description: 'asset model'
    })
    @IsNotEmpty()
    assetModel?: string;
    @IsString()
    @Expose()

    /**
     * Asset color 
     */
    @ApiProperty({
        description: 'asset color'
    })
    @IsNotEmpty()
    assetColor?: string;
    @IsString()
    @Expose()

    /**
     * Vehicle serial number
     */
    @ApiProperty({
        description: 'vehicle serial number'
    })
    @IsNotEmpty()
    vehicleSerialNumber?: string;
    @IsString()
    @Expose()
    /**
     * phone 
     */
    @ApiProperty({
        description: 'phone'
    })
    @IsNotEmpty()
    phone?: string;
    @Expose()
    /**
     * Device state 
     */
    @ApiProperty({
        description: 'device state'
    })
    @IsNumber()
    deviceState?: number;
}