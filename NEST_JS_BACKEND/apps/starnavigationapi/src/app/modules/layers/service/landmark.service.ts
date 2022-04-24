import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { LandmarkEntity } from "../entity/landmark.entity";
import { LandmarkCreateDto } from "../dto/landmark.create.dto";
import * as _ from "lodash";

@Injectable()
export class LandmarkService {
    private readonly logger = new Logger(LandmarkService.name);
    constructor(
        @InjectRepository(LandmarkEntity) private repository: Repository<LandmarkEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

    async create(data: LandmarkCreateDto): Promise<LandmarkEntity> {
        return this.repository.save(data);
    }
    async findById(id: number): Promise<LandmarkEntity> {
        return this.repository.findOne({ id });
    }
    async findAll(): Promise<Array<LandmarkEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }
    async remove(id: number): Promise<LandmarkEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
    async update(id: number, data: LandmarkCreateDto): Promise<LandmarkEntity> {
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Layer id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        return this.repository.save(layer);
    }
    async paginate(state: StateDto): Promise<Pagination<LandmarkEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<LandmarkEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}