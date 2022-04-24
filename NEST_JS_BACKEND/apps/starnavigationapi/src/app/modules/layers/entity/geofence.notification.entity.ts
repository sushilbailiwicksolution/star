import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GeofenceEntity } from './geofence.entity';
import { NotificationEntity } from './notification.entity';

@Entity({ name: "geofence_notifications" })
export class GeofenceNotificationEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;
    @ManyToOne(() => GeofenceEntity, map => map.vehicles, {onDelete: 'CASCADE'})
    @JoinColumn({name: "geofence_id"})
    notification?: GeofenceEntity;
    @OneToOne(() => NotificationEntity, { eager: true })
    @JoinColumn({ name: "id" })
    detail?: NotificationEntity;
}