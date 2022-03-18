import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { LayerCreateDto } from "../dto/layer.create.dto";
import { LayerEntity } from "../entity/layer.entity";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class LayerService {
    private readonly logger = new Logger(LayerService.name);
    constructor(
        @InjectRepository(LayerEntity) private repository: Repository<LayerEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

    async create(data: LayerCreateDto): Promise<LayerEntity> {
        return this.repository.save(data);
    }
    async findById(id: number): Promise<LayerEntity> {
        return this.repository.findOne({ id });
    }
    async findAll(): Promise<Array<LayerEntity>> {
        return this.repository.find();
    }
    async remove(id: number): Promise<LayerEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.deleted;
        return this.repository.save(layer);
    }
    async update(id: number, data: LayerCreateDto): Promise<LayerEntity> {
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
    async paginate(state: StateDto): Promise<Pagination<LayerEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<LayerEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}