import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AplEntity } from './apl.entity';
import { ExtendEntity } from './extend.entity';

@Entity({name: "apl_items"})
export class AplItemEntity extends ExtendEntity {
    @Column({nullable: true})
    mplId?: number;
    @Column({nullable: true})
    units?: string;
    @Column({nullable: true})
    minVal?: number;
    @Column({nullable: true})
    maxVal?: number;
    @Column({nullable: true})
    thresHold?: number;
    @Column({nullable: true})
    color?: string;
    @Column({nullable: true})
    displayOption?: boolean;
    @Column({nullable: true})
    notification?: string;
    @Column({nullable: true})
    severity?: number;
    @ManyToOne(() => AplEntity, (apl) => apl.aplItems , {eager: false, cascade: ['insert', 'update', 'remove'], nullable: false})
    @JoinColumn({name: "apl_id"})
    apl?: AplEntity;
}