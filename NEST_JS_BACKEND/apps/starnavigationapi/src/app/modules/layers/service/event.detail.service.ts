import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { EventDetailDto } from "../dto/event.detail.dto";
import { EventDetailsEntity } from "../entity/event.details.entity";

/**
 * This class contains methods for EventDetaial API
 * @class EventDetailService
 */

@Injectable()
export class EventDetailService {
    private readonly logger = new Logger(EventDetailService.name);

    /**
     * Constructor for Event details
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(EventDetailsEntity) private repository: Repository<EventDetailsEntity>,
        private readonly queryBuilderService: QueryBuilder) { }
/**
 *Creates new EventDetail in database 
 * @param data 
 * @returns 
 */
    async create(data: EventDetailDto): Promise<EventDetailsEntity> {
        return this.repository.save(data);
    }
    /**
     * Find event based on id provided
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<EventDetailsEntity> {
        return this.repository.findOne({ id });
    }
    /**
     * Find all the events 
     * @returns 
     */
    async findAll(): Promise<Array<EventDetailsEntity>> {
        return this.repository.find();
    }

    /**
     * Remove a event based on id provided
     * @param id 
     * @returns 
     */
    async remove(id: number): Promise<EventDetailsEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
    /**
     * Updates event based on id 
     * @param id 
     * @param data 
     * @returns 
     */
    async update(id: number, data: EventDetailDto): Promise<EventDetailsEntity> {
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Event detail id: ${id} not found`,
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
    async paginate(state: StateDto): Promise<Pagination<EventDetailsEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<EventDetailsEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}