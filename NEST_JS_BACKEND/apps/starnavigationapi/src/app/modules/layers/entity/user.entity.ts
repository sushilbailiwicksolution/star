/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { UserTypeEnum } from '../../../enum/user.type.enum';
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
    @Column({nullable: false})
    customerId?: number;
}