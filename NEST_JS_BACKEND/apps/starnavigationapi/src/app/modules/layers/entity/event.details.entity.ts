import { Column, Entity, OneToMany } from 'typeorm';
import { PacketTypeEnum } from '../../../enum/packet.type.enum';
import { EventParamDetailsEntity } from './event.param.details.entity';
import { ExtendEntity } from './extend.entity';


/**
 * This is event_details entity
 * Contains event_details fields 
 */

@Entity({name: "event_details"})
export class EventDetailsEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    name?: string;
    @Column({ type: "enum", enum: PacketTypeEnum, default: PacketTypeEnum.A })
    packetType?: PacketTypeEnum;
    aircraftId?: string;
    @Column({ type: 'timestamp', nullable: true })
    scheduledDepartureTime?: Date;
    @Column("decimal", { precision: 6, scale: 2 })
    gpsLatitude?: number;
    @Column("decimal", { precision: 6, scale: 2 })
    gpsLongitude?: number;
    altitude?: string;
    speed?: string;
    heading?: string;
    startTime?: string;
    stopTime?: string;
    paramCount?: number;
    eventId?: string;
    @OneToMany('EventParamDetailsEntity', 'eventDetails', { onDelete: 'CASCADE' })
    eventParamDetails: EventParamDetailsEntity[]    
}