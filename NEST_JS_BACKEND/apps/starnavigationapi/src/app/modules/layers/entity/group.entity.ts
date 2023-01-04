/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { ExtendEntity } from './extend.entity';


/**
 * This is group entity
 * Contains all group fields. Creates new group  
 */

@Entity({name: "all_groups"})
export class GroupEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    name?: string;
}