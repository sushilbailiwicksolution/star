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


/**
 * This class contains methods for AssetService API Query
 */
@Injectable()
export class AssetService {
    private readonly logger = new Logger(AssetService.name);
    /**
     * Constructor for AssetServices 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(AssetEntity) private repository: Repository<AssetEntity>,
        private readonly queryBuilderService: QueryBuilder) { }


        /**
         * Creates new asset in database
         * @param data 
         * @returns 
         */
    async create(data: LayerCreateDto): Promise<AssetEntity> {
        return this.repository.save(data);
    }

    /**
     * Find a asset based on id of asset
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<AssetEntity> {
        return this.repository.findOne({id});
    }
    /**
     * Find all the assets from database
     * @returns 
     */
    async findAll(): Promise<Array<AssetEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }

    /**
     * Remove a asset from database
     * @param id 
     * @returns 
     */
    async remove(id: number): Promise<AssetEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates asset with new data 
     * @param data 
     * @returns 
     */
    async update(data: LayerCreateDto): Promise<AssetEntity> {
        const id: number = _.result(data,'id',0);
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Asset id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        return this.repository.save(layer);
    }

/**
 * This method finds all the assets based on Customer ID.
 * @param {number}customerId  Functions to find customer asset based on id
 * @returns 
 */
   async findUserAsset(customerId:number):Promise<Array<AssetEntity>> {
       return this.repository.find({customerId})
       
   }


    /**
     * @ignore
     * @param state 
     * @returns 
     */

    async paginate(state: StateDto): Promise<Pagination<AssetEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<AssetEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}