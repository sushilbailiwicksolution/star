import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { LayerCreateDto } from "../dto/layer.create.dto";
import { AssetEntity } from "../entity/asset.entity";
import * as _ from "lodash";

@Injectable()
export class AssetService {
    private readonly logger = new Logger(AssetService.name);
    constructor(
        @InjectRepository(AssetEntity) private repository: Repository<AssetEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

    async create(data: LayerCreateDto): Promise<AssetEntity> {
        return this.repository.save(data);
    }
    async findById(id: number): Promise<AssetEntity> {
        return this.repository.findOne({ id });
    }
    async findAll(): Promise<Array<AssetEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }
    async remove(id: number): Promise<AssetEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
    async update(id: number, data: LayerCreateDto): Promise<AssetEntity> {
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Asset id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        return this.repository.save(layer);
    }
    async paginate(state: StateDto): Promise<Pagination<AssetEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<AssetEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}