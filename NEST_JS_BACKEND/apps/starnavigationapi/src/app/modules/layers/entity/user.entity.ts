/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { CustomerType, UserTypeEnum } from '../../../enum/user.type.enum';
import { ExtendEntity } from './extend.entity';


/**
 * This is users entity
 * Contains users fields and creates column based on these fields into database
 */
 


@Entity({name: "users"})
export class UserEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    username?: string;
    @Column({length: 100, nullable: false})
    password?: string;
    @Column({length: 100, nullable: true})
    lastname?: string;
    @Column({ type: "enum", enum: UserTypeEnum, default: UserTypeEnum.USER })
    accountType?: UserTypeEnum;
    @Column({ type: "enum", enum: CustomerType, default: CustomerType.USER })
    userType?: CustomerType;
    @Column({nullable: true})
    customerId?: number;
    @Column({default:true})
    active: boolean;
    @Column({default:true})
    canChangePassword: boolean;
    @Column({default:"star@admin.com"})
    email_id: string;
    @Column({default:"2025-07-12 12:35:00"})
    expires_on: string;
    @Column({default:"admin"})
    firstname: string;
    @Column({default:"admin"})
    login_id: string;
    @Column({default:false})
    neverExpire: boolean;
    @Column({nullable:true})
    phone_no: string;
  
}