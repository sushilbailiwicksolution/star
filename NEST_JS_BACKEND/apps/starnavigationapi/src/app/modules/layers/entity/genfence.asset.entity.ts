import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AssetEntity } from './asset.entity';
import { GeofenceEntity } from './geofence.entity';

@Entity({ name: "geofence_assets" })
export class GeofenceAssetEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;
    @ManyToOne(() => GeofenceEntity, map => map.vehicles, {onDelete: 'CASCADE'})
    @JoinColumn({name: "asset_id"})
    asset?: GeofenceEntity;
    @OneToOne(() => AssetEntity, { eager: true })
    @JoinColumn({ name: "id" })
    user?: AssetEntity;
}