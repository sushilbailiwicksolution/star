import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { LayerCreateDto } from "../dto/layer.create.dto";
import { LayerEntity } from "../entity/layer.entity";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import * as _ from "lodash";

/**
 * LayerService consist of methods for Layer API
 * @property create new Layer 
 */

@Injectable()
export class LayerService {
    private readonly logger = new Logger(LayerService.name);
    /**
     * THis is LayerService Constructor 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(LayerEntity) private repository: Repository<LayerEntity>,
        private readonly queryBuilderService: QueryBuilder) { }
     /**
      * This creates a new Layer in database
      * @param {object}data Takes data from GUI 
      * @returns Updates the database
      */
    async create(data: LayerCreateDto): Promise<LayerEntity> {
        return this.repository.save(data);
    }

    /**
     * Finds the layer based on id provided 
     * @param {number}id Finds the layer based on id provided 
     * @returns With the data matched with id 
     */
    async findById(id: number): Promise<LayerEntity> {
        return this.repository.findOne({ id });
    }
    /**
     * All the data related to layer 
     * @returns All the data related to layer 
     */
    async findAll(): Promise<Array<LayerEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }

    /**
     * Checks for id in database and delete that layer 
     * @param {number}id Checks for id in database 
     * @returns Delete the respective id if found in database
     */
    async remove(id: number): Promise<LayerEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates a layer with new entries
     * @param {number}id Checks for the id  
     * @param {object}data Update the Layer data based on id 
     * @returns Update the database
     */
    async update(id: number, data: LayerCreateDto): Promise<LayerEntity> {
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
    async paginate(state: StateDto): Promise<Pagination<LayerEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<LayerEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}