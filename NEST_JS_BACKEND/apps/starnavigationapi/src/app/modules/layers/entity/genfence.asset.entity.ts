import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AssetEntity } from './asset.entity';
import { GeofenceEntity } from './geofence.entity';

/**
 * This is geofence_assets entity
 * Contains geofence_assets fields 
 */


@Entity({ name: "geofence_assets" })
export class GeofenceAssetEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;

    @ManyToOne(() => GeofenceEntity, map => map.vehicles)
    @JoinColumn({name: "geofence_id"})
    asset?: GeofenceEntity;

    @Column({name: 'asset_id'})
    assetId?: number;
    
}