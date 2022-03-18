import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StatusEnum } from '../../../enum/status.enum';

@Entity()
export class LandmarkEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({length: 64})
    name?: string;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
    @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.pending })
    status?: StatusEnum;
    @Column({length: 64})
    createdBy?: string;
    @Column({length: 64})
    updatedBy?: string;
    @Column()
    layerId?: number;
    @Column("simple-json")
    geojsonobject?: unknown;
    @Column({length: 16})
    locationType?: string;
}