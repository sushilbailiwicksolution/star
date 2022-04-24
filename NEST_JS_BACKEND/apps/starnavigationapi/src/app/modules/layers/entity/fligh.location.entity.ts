import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExtendEntity } from './extend.entity';
import { FlighPlanEntity } from './flight.plan.entity';

@Entity({name: "fligh_location"})
export class FlighLocationEntity extends ExtendEntity {
    sequence?: number;
    type?: string;
    legTime?: number;
    @Column("decimal", { precision: 6, scale: 2 })
    latitude?: number;
    @Column("decimal", { precision: 6, scale: 2 })
    longitude?: number;
    altitude?: number;
    radius?: number;
    bufferHeight?: number;
    bufferWidth?: number;
    stage?: string;
    stopTime?: number;
    @ManyToOne(() => FlighPlanEntity, (plan) => plan.locations , {nullable: false, eager: false, cascade: ['insert', 'update', 'remove']})
    @JoinColumn({name: "flight_plan_id"})
    flightPlan?: FlighPlanEntity;
    @Column({nullable: true})
    name?: string;
    @Column({ type: 'timestamp', nullable: true })
    scheduledArrivalTime?: Date;
    aircraftModel?: string;
    pilots?: string;
    @Column({ type: 'timestamp', nullable: true })
    estimatedDepartureTime?: Date;
    @Column({ type: 'timestamp', nullable: true })
    estimatedArrivalTime?: Date;
    @Column({ type: 'timestamp', nullable: true })
    actualDepartureTime?: Date;
    @Column({ type: 'timestamp', nullable: true })
    actualArrivalTime?: Date;
    routeBufferHeight?: number;
    routeBufferWidth?: number;
    locationRadius?: number;
    state?: number;
}