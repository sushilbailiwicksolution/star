import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ExtendEntity } from './extend.entity';
import { GeoObjectEntity } from './geo.object.entity';
import { LayerEntity } from './layer.entity';


/**
 * This is landmark entity
 * Contains Landmark fields  creates landmark in database
 */

@Entity({name: "landmark"})
export class LandmarkEntity extends ExtendEntity {
    @Column({length: 64})
    name?: string;
    @Column({type: "simple-json", nullable: true})
    geojsonobject?: unknown;
    @Column({length: 16})
    locationType?: string;

    @OneToOne(() => LayerEntity, { eager: true })
    @JoinColumn({ name: "landmark_layer_id"})
    layer?: LayerEntity;

    @OneToOne('GeoObjectEntity', 'geoobject', { onDelete: 'CASCADE', cascade: true })
    @JoinColumn({name: "geo_object_id", referencedColumnName: 'id'})
	geoObject?: GeoObjectEntity;
}