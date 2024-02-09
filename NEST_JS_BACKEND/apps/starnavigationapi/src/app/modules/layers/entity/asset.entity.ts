import { Column, Entity } from 'typeorm';
import { ExtendEntity } from './extend.entity';

/**
 * This is asset entity
 * Contains asset fields . Creates asset table in database with respective fields
 */

@Entity({ name: "asset" })
export class AssetEntity extends ExtendEntity {
    @Column({ length: 100, nullable: false })
    esn?: string;
    @Column({nullable: true})
    vehicletype?: string;
    @Column({nullable: true})
    deviceType?: string;
    @Column({nullable: true})
    countryId?: number;
    @Column({nullable: false})
    customerId?: number;
    @Column({nullable: true})
    alias?: string;
    @Column({nullable: true})
    description?: string;
    @Column({nullable: true})
    symbolStrokeSize?: number;
    @Column({nullable: true})
    symbolStrokeColor?: string;
    @Column({nullable: true})
    trackColor?: string;
    @Column({nullable: true})
    symbolColor?: string;
    @Column({nullable: false})
    name?: string;
    @Column("decimal", { precision: 6, scale: 2 })
    symbolSize?: number;
    @Column("decimal", { precision: 6, scale: 2 })
    trackwidth?: number;
    @Column({nullable: true})
    twoWayMessaging?: boolean;
    @Column({nullable: true})
    twoWayMessageMaxLength?: number;
    @Column({nullable: true})
    weblink?: string;
    @Column({nullable: true})
    assetSerialNumber?: string;
    @Column({nullable: true})
    assetRegistrationNumber?: string;
    @Column({nullable: true})
    assetMake?: string;
    @Column({nullable: true})
    assetModel?: string;
    @Column({nullable: true})
    assetColor?: string;
    @Column({nullable: true})
    vehicleSerialNumber?: string;
    @Column({nullable: true})
    phone?: string;
    @Column({nullable: true})
    deviceState?: number;
    @Column({nullable: true})
    start_event_id?: string;
    @Column({nullable: true})
    end_event_id?: string;
}