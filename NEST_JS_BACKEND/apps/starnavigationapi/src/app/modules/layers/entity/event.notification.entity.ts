


import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
 import { EventBasedNotificationEntity } from './event.based.notification.entity';


/**
 * This is Geofence Notification entity
 * Contains Geofence Notification field creates new geofence Notification
 */

@Entity({ name: "events_notifications_list" })
export class EventNotificationEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;

    @ManyToOne(() => EventBasedNotificationEntity, map => map.notifications, {onDelete: 'CASCADE'})
    @JoinColumn({name: "event_id"})
    notification?: EventBasedNotificationEntity;

    
    @Column({name: 'notification_id'})
    notificationId?: number;
}