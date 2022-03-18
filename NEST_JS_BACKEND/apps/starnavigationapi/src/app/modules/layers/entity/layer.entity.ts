import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StatusEnum } from '../../../enum/status.enum';

@Entity()
export class LayerEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({length: 64})
    name?: string;
    @CreateDateColumn()
    createdAt?: Date;
    @UpdateDateColumn()
    updatedAt?: Date;
    @Column({length: 512})
    address?: string;
    @Column({length: 64})
    city?: string;
    @Column({length: 64})
    country?: string;
    @Column()
    zip?: number;
    @Column({length: 64})
    state?: string;
    @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.pending })
    status?: StatusEnum;
    @Column({length: 64})
    createdBy?: string;
    @Column({length: 64})
    updatedBy?: string;
    @Column()
    customerId?: number;
}