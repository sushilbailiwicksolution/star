import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';


/**
 * This is LandmarkCreate class
 * 
 * Describes all the fields of LandmarkCreate for API 
 * 
 * @ignore
 */
export class LandmarkCreateDto {
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
    @ApiProperty()
    createdBy?: string;
    @Expose()
    createdAt?: Date;
    @Expose()
    updatedAt?: Date;
    @Expose()
    @ApiProperty()
    layerId?: number;
    @Expose()
    @ApiProperty()
    geojsonobject?: unknown;
    @Expose()
    @ApiProperty()
    locationType?: string;
}