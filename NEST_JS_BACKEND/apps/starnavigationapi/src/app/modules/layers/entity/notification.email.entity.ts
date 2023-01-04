import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NotificationEntity } from './notification.entity';


/**
 * This is notification email  entity
 * Contains notification email fields 
 */

@Entity({name: "notification_emails"})
export class NotificationEmailEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;
    @Column({length: 64})
    email?: string;
    @ManyToOne(() => NotificationEntity, map => map.emails, {onDelete: 'CASCADE'})
    @JoinColumn({name: "notification_id"})
    notification?: NotificationEntity;
}