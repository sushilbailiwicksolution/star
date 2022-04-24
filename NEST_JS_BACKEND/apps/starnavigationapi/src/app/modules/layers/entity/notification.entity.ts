/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { NotificationTypeEnum } from '../../../enum/notification.type.enum';
import { ExtendEntity } from './extend.entity';
import { NotificationEmailEntity } from './notification.email.entity';
import { NotificationTemplateEntity } from './notification.template.entity';
import { NotificationUserEntity } from './notification.user.entity';

@Entity({ name: "notification" })
export class NotificationEntity extends ExtendEntity {
    @Column({ length: 64, nullable: false })
    name?: string;
    @Column({ name: "timezone", nullable: false })
    timezone?: string;
    @Column({ type: "enum", enum: NotificationTypeEnum, default: NotificationTypeEnum.EMAIL })
    type?: NotificationTypeEnum;
    @Column({ name: "customer_id", nullable: false })
    customerId?: number;
    @OneToMany('NotificationEmailEntity', 'notification', { onDelete: 'CASCADE', eager: true, cascade: true })
    emails?: NotificationEmailEntity[];
    @OneToOne(type => NotificationTemplateEntity, { eager: true })
    @JoinColumn({ name: "email_template_id" })
    emailTemplate?: NotificationTemplateEntity;
    @OneToOne(type => NotificationTemplateEntity, { eager: true })
    @JoinColumn({ name: "sms_template_id" })
    smsTemplate?: NotificationTemplateEntity;
    
    @OneToMany('NotificationUserEntity', 'notification', { onDelete: 'CASCADE', eager: true, cascade: true })
    users?: NotificationUserEntity[];
}