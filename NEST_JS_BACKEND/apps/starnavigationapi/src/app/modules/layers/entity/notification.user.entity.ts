import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import { UserEntity } from './user.entity';


/**
 * This Notification entity
 * Contains notification fields and creates notification in database 
 */

@Entity({ name: "notification_users" })
export class NotificationUserEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;
    @ManyToOne(() => NotificationEntity, map => map.emails, {onDelete: 'CASCADE'})
    @JoinColumn({name: "notification_id"})
    notification?: NotificationEntity;

    @OneToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: "id" })
    user?: UserEntity;
}