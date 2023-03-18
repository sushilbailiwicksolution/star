import { Column, Entity, OneToMany } from 'typeorm';
import { ExtendEntity } from './extend.entity';
import { GeofenceEntity } from './geofence.entity';


/**
 * This is Layer entity
 * Contains layer fields creates layer in database 
 */

@Entity({name: "layers"})
export class LayerEntity extends ExtendEntity {
    @Column({length: 64})
    name?: string;
    @Column({length: 512})
    address?: string;
    @Column({length: 64})
    city?: string;
    @Column({length: 64})
    country?: string;
    @Column()
    zip?: number;
    @Column({length: 64})
    state?: string;
    @Column({nullable: true})
    customerId?: number;
    @OneToMany('GeofenceEntity', 'geofence', { onDelete: 'CASCADE' })
    geofence: GeofenceEntity[]
}