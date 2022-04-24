import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsInt } from 'class-validator';

export class LayerCreateDto {
    @Expose()
    id?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'The name of layer'
    })
    name?: string;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'Address for a layer'
    })
    address?: string;
    @IsString()
    @Expose()
    @ApiProperty()
    city?: string;
    @IsString()
    @Expose()
    @ApiProperty()
    country?: string;
    @IsInt()
    @Expose()
    @ApiProperty()
    zip?: number;
    @IsString()
    @Expose()
    @ApiProperty()
    state?: string;
    @IsString()
    @Expose()
    @ApiProperty()
    createdBy?: string;
    @Expose()
    createdAt?: Date;
    @Expose()
    updatedAt?: Date;
}