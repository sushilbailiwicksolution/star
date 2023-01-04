import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GeofenceEntity } from './geofence.entity';


/**
 * This is Geofence Notification entity
 * Contains Geofence Notification field creates new geofence Notification
 */

@Entity({ name: "geofence_notifications" })
export class GeofenceNotificationEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;

    @ManyToOne(() => GeofenceEntity, map => map.notifications, {onDelete: 'CASCADE'})
    @JoinColumn({name: "geofence_id"})
    notification?: GeofenceEntity;

    
    @Column({name: 'notification_id'})
    notificationId?: number;
}