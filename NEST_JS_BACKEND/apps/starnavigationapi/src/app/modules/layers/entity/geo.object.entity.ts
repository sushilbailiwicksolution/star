import { Column, Entity, OneToOne } from 'typeorm';
import { ExtendEntity } from './extend.entity';
import { LandmarkEntity } from './landmark.entity';


/**
 * This is geo_object entity
 * Contains geo_object fields creates new entry
 */

@Entity({name: "geo_object"})
export class GeoObjectEntity extends ExtendEntity {
    @Column({length: 64})
    type?: string;
    bufferDistance?: string;
    geom?: string;
    geoFormat?: string;
    srid?: number;
    @OneToOne('LandmarkEntity', 'landmark', { onDelete: 'CASCADE' })
    landmark: LandmarkEntity;
}