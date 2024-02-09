import { Column, Entity, OneToMany } from 'typeorm';
import { AplItemEntity } from './apl.item.entity';
import { ExtendEntity } from './extend.entity';

/**
 * This is apl entity 
 * Contains apl fields , Creates  apl table im database with respective fields
 */

@Entity({name: "apl"})
export class AplEntity extends ExtendEntity {
    @Column({nullable: true, length: 128})
    esn?: string;
    @Column({nullable: true})
    customerId?: number;
    @Column({nullable: true, length: 128})
    version?: string;
    @OneToMany(() => AplItemEntity, (item) => item.apl)
    aplItems: AplItemEntity[]    
}