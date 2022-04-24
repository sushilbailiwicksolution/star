/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { UserTypeEnum } from '../../../enum/user.type.enum';
import { ExtendEntity } from './extend.entity';

@Entity({name: "users"})
export class UserEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    username?: string;
    @Column({length: 100, nullable: false})
    firstname?: string;
    @Column({length: 100, nullable: true})
    lastname?: string;
    @Column({ type: "enum", enum: UserTypeEnum, default: UserTypeEnum.USER })
    accountType?: UserTypeEnum;
    @Column({nullable: false})
    customerId?: number;
}