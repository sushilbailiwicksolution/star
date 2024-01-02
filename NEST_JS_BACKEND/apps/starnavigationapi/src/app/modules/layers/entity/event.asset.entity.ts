
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EventBasedNotificationEntity } from './event.based.notification.entity';
/**
 * This is geofence_assets entity
 * Contains geofence_assets fields 
 */


@Entity({ name: "event_assets" })
export class EventAssetEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;

    @ManyToOne(() => EventBasedNotificationEntity, map => map.vehicles)
    @JoinColumn({name: "event_id"})
    asset?: EventBasedNotificationEntity;

    @Column({name: 'asset_id'})
    assetId?: number;
    
}