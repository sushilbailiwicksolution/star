import { Column, Entity } from 'typeorm';
import { ExtendEntity } from './extend.entity';

/**
 * This is customer entity
 * Contains customer fields, Create customer in database 
 */

@Entity({name: "customers"})
export class CustomerEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    name?: string;
    email?: string;
    address?: string;
    website?: string;
    phoneNumber?: string;
    countryCode?: string;
}