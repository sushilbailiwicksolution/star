import { Column, Entity } from 'typeorm';
import { ExtendEntity } from './extend.entity';

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