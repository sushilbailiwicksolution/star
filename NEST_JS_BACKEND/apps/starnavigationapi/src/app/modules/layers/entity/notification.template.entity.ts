import { Column, Entity } from 'typeorm';
import { ExtendEntity } from './extend.entity';

@Entity({name: "notification_template"})
export class NotificationTemplateEntity extends ExtendEntity {
    @Column({type: 'text', nullable: false})
    body?: string;
    @Column({length: 64, nullable: false})
    name?: string;
    @Column({length: 64, nullable: false})
    subject?: string;
}