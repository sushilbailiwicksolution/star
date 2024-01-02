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

/**
 * LandmarkService consist of methods for Landmark API
 */

@Injectable()
export class LandmarkService {
    private readonly logger = new Logger(LandmarkService.name);
    /**
     * This is constructor for Landmark Service 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(LandmarkEntity) private repository: Repository<LandmarkEntity>,
        private readonly queryBuilderService: QueryBuilder) { }
     
    /**
     * Create new Landmark in database 
     * @param {object}data Takes this and save it into database (new entry)
     * @returns Saves this data into database
     */
    async create(data: LandmarkCreateDto): Promise<LandmarkEntity> {
        return this.repository.save(data);
    }
    /**
     * Find Landmark based on id provided 
     * @param {number}id Checks for the id of landmark into database 
     * @returns with the data related to the id 
     */
    async findById(id: number): Promise<LandmarkEntity> {
        return this.repository.findOne({ id });
    }
    /**
     * Find all the landmarks into database
     * @returns All the landmarks saved in database
     */
    async findAll(): Promise<Array<LandmarkEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }

    /**
     * Removes the landmark based on id provided.
     * @param {number}id  Checks for the id  
     * @returns 
     */
    async remove(id: number): Promise<LandmarkEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates landmark based on id  provided 
     * @param id Updates Landmark based on id provided
     * @param data 
     * @returns 
     */
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

    /**
     * @ignore
     * @param state 
     * @returns 
     */
    async paginate(state: StateDto): Promise<Pagination<LandmarkEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<LandmarkEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}