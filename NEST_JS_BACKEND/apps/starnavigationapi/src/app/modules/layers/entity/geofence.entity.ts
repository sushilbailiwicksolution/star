import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EventSeverityEnum } from '../../../enum/event.severity.enum';
import { NotifyEnum } from '../../../enum/notify.enum';
import { ExtendEntity } from './extend.entity';
import { GeofenceAssetEntity } from './genfence.asset.entity';
import { GeofenceNotificationEntity } from './geofence.notification.entity';
import { LandmarkEntity } from './landmark.entity';
import { LayerEntity } from './layer.entity';

@Entity({name: "geofence"})
export class GeofenceEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    name?: string;
    @Column({ type: "enum", enum: NotifyEnum, default: NotifyEnum.INSIDE })
    notify?:NotifyEnum;  
    @Column({name: 'buffer_distance'})
    bufferDistance?: number;
    @Column({name: 'notify_map', length: 3})
    notifyMap?: string = "Yes";
    @Column({name: 'notify_email', length: 3})
    notifyEmail?: string = "Yes";
    @Column({name: 'description'})
    description?: string;
    @Column({name: 'min_altitude'})
    minAltitude?: number;
    @Column({name: 'max_altitude'})
    maxAltitude?: number;
    @Column("decimal", { precision: 6, scale: 2 , name: 'min_velocity'})
    minVelocity?: number;
    @Column("decimal", { precision: 6, scale: 2, name: 'max_velocity' })
    maxVelocity?: number;
    @Column({ type: "enum", enum: EventSeverityEnum, default: EventSeverityEnum.low, name: 'event_severity' })
    eventSeverity?:EventSeverityEnum;
    @Column({name: 'schedule_start_time'})
    scheduleStartTime?: string;
    @Column({name: 'schedule_end_time'})
    scheduleEndTime?: string;
    @Column({nullable: false, name: 'customer_id'})
    custumerId?: number;
    @Column({type: "simple-json", nullable: true})
    geojsonobject?: unknown;

    @OneToMany('GeofenceAssetEntity', 'asset', { onDelete: 'CASCADE', eager: true, cascade: true })
    vehicles?: GeofenceAssetEntity[];    

    @OneToOne(() => LayerEntity, { eager: true })
    @JoinColumn({ name: "g_layer_id" })
    layer?: LayerEntity;

    @OneToOne(() => LandmarkEntity, { eager: true })
    @JoinColumn({ name: "g_landmark_id" })
    landmark?: LandmarkEntity;
    
    @OneToMany('GeofenceNotificationEntity', 'notification', {onDelete: 'CASCADE', eager: true, cascade: true })
    notifications?: GeofenceNotificationEntity[];
}