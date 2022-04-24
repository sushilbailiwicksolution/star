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

@Injectable()
export class GeofenceService {
    private readonly logger = new Logger(GeofenceService.name);
    constructor(
        @InjectRepository(GeofenceEntity) private repository: Repository<GeofenceEntity>,
        @InjectRepository(LayerEntity) private layerRepository: Repository<LayerEntity>,
        @InjectRepository(LandmarkEntity) private landmarkRepository: Repository<LandmarkEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

    async create(data: GeofenceDto): Promise<GeofenceEntity> {
        const layer = await this.layerRepository.findOne({id: data.layerId});
        const landmark = await this.landmarkRepository.findOne({id: data.landmarkId});
        const geofence: GeofenceEntity = Object.assign(data);
        geofence.layer = layer;
        geofence.landmark = landmark;
        const notification = await this.repository.save(geofence);
        return notification;
    }
    async findById(id: number): Promise<GeofenceEntity> {
        return this.repository.findOne({ id: id, status: StatusEnum.ACTIVE });
    }
    async findAll(): Promise<Array<GeofenceEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }
    async remove(id: number): Promise<GeofenceEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
    async update(id: number, data: GeofenceDto): Promise<GeofenceEntity> {
        data = _.omit(data, ['id']);
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
    async paginate(state: StateDto): Promise<Pagination<GeofenceEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<GeofenceEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}