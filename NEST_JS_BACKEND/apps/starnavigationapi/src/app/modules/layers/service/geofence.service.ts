import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { GeofenceDto } from "../dto/geofence.dto";
import { GeofenceEntity } from "../entity/geofence.entity";
import { LandmarkEntity } from "../entity/landmark.entity";
import { LayerEntity } from "../entity/layer.entity";
import { UserEntity } from "../entity/user.entity";
import * as _ from "lodash";
import { CustomerEntity } from "../entity/customer.entity";
import { GeofenceNotificationEntity } from "../entity/geofence.notification.entity";
import { NotificationEntity } from "../entity/notification.entity";
import { GeofenceAssetEntity } from "../entity/genfence.asset.entity";
import { AssetEntity } from "../entity/asset.entity";


/**
 * This class contains method for geofence services
 * @class Geofence
 */
@Injectable()
export class GeofenceService {
    private readonly logger = new Logger(GeofenceService.name);
    /**
     * Constructor for geofence service 
     * @param repository 
     * @param layerRepository 
     * @param landmarkRepository 
     * @param userRepository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(GeofenceEntity) private repository: Repository<GeofenceEntity>,
        @InjectRepository(LayerEntity) private layerRepository: Repository<LayerEntity>,
        @InjectRepository(LandmarkEntity) private landmarkRepository: Repository<LandmarkEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

        /**
         * Create new GeoFence 
         * @param data 
         * @returns 
         */
    async create(data: GeofenceDto): Promise<GeofenceEntity> {
        data.vehicles.forEach(o => {
            o = Object.assign(o, {assetId: o.id})
            _.omit(o, ['id']);
        });
        data.notifications.forEach(o => {
            o = Object.assign(o, {notificationId: o.id})
            _.omit(o, ['id']);
        });
        const geofence: GeofenceEntity = Object.assign(data);
        const notification = await this.repository.save(geofence);
        return notification;
    }

    /**
     * Finds Geofence based on id provided
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<GeofenceEntity> {
        return this.repository.createQueryBuilder('t')
        .leftJoinAndMapOne('t.customer',CustomerEntity,'customer','t.customer_id = customer.id')
        .leftJoinAndMapOne('t.layer',LayerEntity,'layer','t.g_layer_id  = layer.id')
        .leftJoinAndMapOne('t.landmark',LandmarkEntity,'landmark','t.g_landmark_id  = landmark.id')
        .leftJoinAndMapMany('t.notifications',GeofenceNotificationEntity,'n','t.id  = n.geofence_id')
        .leftJoinAndMapOne('n.notification', NotificationEntity,'notification','n.notification_id  = notification.id')
        .leftJoinAndMapMany('t.vehicles',GeofenceAssetEntity,'a','t.id  = a.geofence_id')
        .leftJoinAndMapOne('a.asset', AssetEntity,'asset','a.asset_id  = asset.id')
        .where('t.id = :id', {id})
        .getOne();
        return this.repository.findOne({ id: id, status: StatusEnum.ACTIVE });
    }

    /**
     * Finds all the geofence entries in database
     * @returns 
     */
    async findAll(): Promise<Array<GeofenceEntity>> {
        return this.repository.createQueryBuilder('t')
        .leftJoinAndMapOne('t.customer',CustomerEntity,'customer','t.customer_id = customer.id')
        .leftJoinAndMapOne('t.layer',LayerEntity,'layer','t.g_layer_id  = layer.id')
        .leftJoinAndMapOne('t.landmark',LandmarkEntity,'landmark','t.g_landmark_id  = landmark.id')
        .leftJoinAndMapMany('t.notifications',GeofenceNotificationEntity,'n','t.id  = n.geofence_id')
        .leftJoinAndMapOne('n.notification', NotificationEntity,'notification','n.notification_id  = notification.id')
        .leftJoinAndMapMany('t.vehicles',GeofenceAssetEntity,'a','t.id  = a.geofence_id')
        .leftJoinAndMapOne('a.asset', AssetEntity,'asset','a.asset_id  = asset.id')
        .where('t.status = :status', {status: StatusEnum.ACTIVE})
        .getMany();
    }

    /**
     * Remove Geofence based on id provided
     * @param id 
     * @returns 
     */
    async remove(id: number): Promise<GeofenceEntity> {
        console.log('id: ', id);
        await this.repository.createQueryBuilder('t').update(GeofenceEntity).set({status: StatusEnum.DELETED})
        .where("id = :id", {id}).execute();
        return this.findById(id);
    }

    /**
     * Updates Geofence entry based on id
     * @param id 
     * @param data 
     * @returns 
     */
    async update(id: number, data: GeofenceDto): Promise<GeofenceEntity> {
        data = _.omit(data, ['id']);
        data.vehicles.forEach(o => {
            o = Object.assign(o, {assetId: o.id})
            _.omit(o, ['id']);
        });
        data.notifications.forEach(o => {
            o = Object.assign(o, {notificationId: o.id})
            _.omit(o, ['id']);
        });
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Notification id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        const notification = await this.repository.save(layer);
        return notification;
    }

    /**
     * @ignore
     * @param state 
     * @returns 
     */
    async paginate(state: StateDto): Promise<Pagination<GeofenceEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<GeofenceEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}