import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { GroupDto } from "../dto/group.dto";
import { GroupEntity } from "../entity/group.entity";
import * as _ from "lodash";

@Injectable()
export class GroupService {
    private readonly logger = new Logger(GroupService.name);
    constructor(
        @InjectRepository(GroupEntity) private repository: Repository<GroupEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

    async create(data: GroupDto): Promise<GroupEntity> {
        return this.repository.save(data);
    }
    async findById(id: number): Promise<GroupEntity> {
        return this.repository.findOne({ id });
    }
    async findAll(): Promise<Array<GroupEntity>> {
        return this.repository.find();
    }
    async remove(id: number): Promise<GroupEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
    async update(id: number, data: GroupDto): Promise<GroupEntity> {
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Group id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        return this.repository.save(layer);
    }
    async paginate(state: StateDto): Promise<Pagination<GroupEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<GroupEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}