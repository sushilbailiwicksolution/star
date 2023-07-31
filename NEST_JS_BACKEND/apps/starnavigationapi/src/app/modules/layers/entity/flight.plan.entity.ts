import { Column, Entity, OneToMany } from 'typeorm';
import { ExtendEntity } from './extend.entity';
import { FlighLocationEntity } from './fligh.location.entity';


/**
 * This is flight_Plan entity
 * Contains flightPlan fields 
 */

@Entity({name: "fligh_plan"})
export class FlighPlanEntity extends ExtendEntity {
    @Column({length: 64, nullable: false})
    tailNumber?: string;
    @Column({length: 64, nullable: false})
    flightNumber?: string;
    @Column({ type: 'timestamp', nullable: false })
    scheduledDepartureTime?: Date;
    @OneToMany(() => FlighLocationEntity, (location) => location.flightPlan)
    locations: FlighLocationEntity[]
}