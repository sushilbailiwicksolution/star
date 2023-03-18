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


/**
 * This class contains methods for GroupService API
 */
@Injectable()
export class GroupService {
    private readonly logger = new Logger(GroupService.name);
    /**
     * Constructor for group service 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(GroupEntity) private repository: Repository<GroupEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

         /**
          * Creates new Group in database
          * @param data 
          * @returns 
          */
    async create(data: GroupDto): Promise<GroupEntity> {
        return this.repository.save(data);
    }

    /**
     * Finds a GroupService based on id 
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<GroupEntity> {
        return this.repository.findOne({ id });
    }
    /**
     * Finds all the Group
     * @returns With all the entries in database
     */
    async findAll(): Promise<Array<GroupEntity>> {
        return this.repository.find();
    }
    /**
     * Remove a GroupService based on id provided
     * @param id 
     * @returns 
     */
    async remove(id: number): Promise<GroupEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates new entries based on id and new data provided 
     * @param id 
     * @param data 
     * @returns 
     */
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

    /**
     * @ignore
     * @param state 
     * @returns 
     */
    async paginate(state: StateDto): Promise<Pagination<GroupEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<GroupEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}