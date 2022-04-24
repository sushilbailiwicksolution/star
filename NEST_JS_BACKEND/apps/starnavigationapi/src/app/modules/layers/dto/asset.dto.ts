import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ExtendDto } from './extend.dto';

export class AssetDto extends ExtendDto {
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'asset esn'
    })
    @IsNotEmpty()
    esn?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'vehicle type'
    })
    @IsNotEmpty()
    vehicletype?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'device type'
    })
    @IsNotEmpty()
    deviceType?: string;
    @Expose()
    @ApiProperty({
        description: 'country id'
    })
    @IsNumber()
    countryId?: number;
    @Expose()
    @ApiProperty({
        description: 'customer id'
    })
    @IsNumber()
    customerId?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'alias'
    })
    @IsNotEmpty()
    alias?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'description'
    })
    description?: string;
    @Expose()
    @ApiProperty({
        description: 'Symbol stroke size'
    })
    @IsNumber()
    symbolStrokeSize?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'symbol stroke color'
    })
    @IsNotEmpty()
    symbolStrokeColor?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'track color'
    })
    @IsNotEmpty()
    trackColor?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'symbol color'
    })
    @IsNotEmpty()
    symbolColor?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'name of asset'
    })
    @IsNotEmpty()
    name?: string;
    @Expose()
    @ApiProperty({
        description: 'Symbol size'
    })
    @IsNumber()
    symbolSize?: number;
    @Expose()
    @ApiProperty({
        description: 'Track width'
    })
    @IsNumber()
    trackwidth?: number;
    @Expose()
    @ApiProperty({
        description: 'Symbol stroke size'
    })
    @IsBoolean()
    twoWayMessaging?: boolean;
    @Expose()
    @ApiProperty({
        description: 'two way message max length'
    })
    @IsNumber()
    twoWayMessageMaxLength?: number;
    @Expose()
    @ApiProperty({
        description: 'Web link'
    })
    @IsNotEmpty()
    @IsString()
    weblink?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'asset serial number'
    })
    @IsNotEmpty()
    assetSerialNumber?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'asset registration number'
    })
    @IsNotEmpty()
    assetRegistrationNumber?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'asset make'
    })
    @IsNotEmpty()
    assetMake?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'asset model'
    })
    @IsNotEmpty()
    assetModel?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'asset color'
    })
    @IsNotEmpty()
    assetColor?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'vehicle serial number'
    })
    @IsNotEmpty()
    vehicleSerialNumber?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'phone'
    })
    @IsNotEmpty()
    phone?: string;
    @Expose()
    @ApiProperty({
        description: 'device state'
    })
    @IsNumber()
    deviceState?: number;
}