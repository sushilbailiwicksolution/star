import { Column, Entity } from 'typeorm';
import { ExtendEntity } from './extend.entity';


/**
 * This is Notification template  entity
 * Contains Notification template fields and creates notification in database 
 */

@Entity({name: "notification_template"})
export class NotificationTemplateEntity extends ExtendEntity {
    @Column({type: 'text', nullable: false})
    body?: string;
    @Column({length: 64, nullable: false})
    name?: string;
    @Column({length: 64, nullable: false})
    subject?: string;
}