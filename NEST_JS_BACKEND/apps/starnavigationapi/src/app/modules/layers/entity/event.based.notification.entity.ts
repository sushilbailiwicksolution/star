import { Column, Entity, OneToMany } from 'typeorm';
import { ExtendEntity } from './extend.entity';
import { EventAssetEntity } from './event.asset.entity';
import { EventNotificationEntity } from './event.notification.entity';


/**
 * This is Event entity
 * Contains Event fields creates new entry in database
 */

@Entity({name: "event_based_notification"})
export class EventBasedNotificationEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    name?: string;
    @Column({name: 'notify_email', length: 3})
    notifyEmail?: string = "Yes";
    @Column({name: 'description'})
    description?: string;
    @Column({nullable: false, name: 'customer_id'})
    customerId?: number;
    @Column({nullable:false,name:'customer_name', default:""})
    customerName?:string;
    @Column({name: 'eventid', default:""})
    eventId?: string;
    @Column({name: 'eventname', default:""})
    eventName?:string;

    @OneToMany('EventAssetEntity', 'asset', { eager: true, cascade: true })
    vehicles?: EventAssetEntity[];

    @OneToMany('EventNotificationEntity', 'notification', {onDelete: 'CASCADE', eager: true, cascade: true })
    notifications?: EventNotificationEntity[];
    
}