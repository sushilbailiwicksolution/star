/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { ExtendEntity } from './extend.entity';

@Entity({name: "all_groups"})
export class GroupEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    name?: string;
}