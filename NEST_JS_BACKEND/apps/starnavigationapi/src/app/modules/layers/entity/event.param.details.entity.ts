import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PacketTypeEnum } from '../../../enum/packet.type.enum';
import { EventDetailsEntity } from './event.details.entity';
import { ExtendEntity } from './extend.entity';

@Entity({name: "event_param_details"})
export class EventParamDetailsEntity extends ExtendEntity {
    @Column({ type: "enum", enum: PacketTypeEnum, default: PacketTypeEnum.A })
    packetType?: PacketTypeEnum;
    paramId?: number;
    paramValue?: string;
    @ManyToOne(() => EventDetailsEntity, (event) => event.eventParamDetails , {nullable: false, eager: false, cascade: ['insert', 'update', 'remove']})
    @JoinColumn({name: "event_id"})
    eventDetails?: EventParamDetailsEntity;
}