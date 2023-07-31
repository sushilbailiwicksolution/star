import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { AplDto } from "../dto/apl.dto";
import { AplEntity } from "../entity/apl.entity";


/**
 * This provides AplService methods for API Query
 */
@Injectable()
export class AplService {
    private readonly logger = new Logger(AplService.name);
    /**
     * Constructor for apl services 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(AplEntity) private repository: Repository<AplEntity>,
        private readonly queryBuilderService: QueryBuilder) { }
     /**
      * Creates new Api based on data 
      * @param data 
      * @returns 
      */
    async create(data: AplDto): Promise<AplEntity> {
        return this.repository.save(data);
    }
    /**
     * Find APl based on id
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<AplEntity> {
        return this.repository.findOne({ id });
    }
    /**
     * Find all the apl in database
     * @returns 
     */
    async findAll(): Promise<Array<AplEntity>> {
        return this.repository.find();
    }

    /**
     * This query removes apl based on id 
     * @param id 
     * @returns 
     */
    async remove(id: number): Promise<AplEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates apl with new data checks firstly with id 
     * @param id 
     * @param data 
     * @returns 
     */
    async update(id: number, data: AplDto): Promise<AplEntity> {
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Apl id: ${id} not found`,
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
    async paginate(state: StateDto): Promise<Pagination<AplEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<AplEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}