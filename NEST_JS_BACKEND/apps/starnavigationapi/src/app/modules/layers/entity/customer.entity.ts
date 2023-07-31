import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerType } from '../../../enum/user.type.enum';
import { ExtendEntity } from './extend.entity';
import { UserEntity } from './user.entity';

/**
 * This is customer entity
 * Contains customer fields, Create customer in database 
 */

// @Entity({name: "customers"})
// export class CustomerEntity extends ExtendEntity {
//     @Column({length: 100, nullable: false})
//     name?: string;
//     email?: string;
//     address?: string;
//     website?: string;
//     phoneNumber?: string;
//     customerType:CustomerType;
//     countryCode?: string;

    
//   @Column({ default: false })
//   administrator: boolean;

//   @ManyToOne(() => UserEntity, (user) => user.customerId)
//   user: UserEntity;
// }








@Entity({name:"new_customer"})
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  userId: number;



  @OneToOne(() => UserEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}

