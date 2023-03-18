import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusEnum } from "../../../enum/status.enum";


/**
 * This is Extended  entity
 * Contains Extended fields . It supports other entities
 * 
 * @ignore
 */

export class ExtendEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;
    @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
    status?: StatusEnum;
    @Column({ length: 64 , name: "created_by"})
    createdBy?: string;
    @Column({ length: 64, nullable: true, name: "updated_by" })
    updatedBy?: string;
}