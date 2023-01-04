import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { CustomerDto } from "../dto/customer.dto";
import { CustomerEntity } from "../entity/customer.entity";
import * as _ from "lodash";

/**
 * This class contains methods for CustomerService API.
 */

@Injectable()
export class CustomerService {
    private readonly logger = new Logger(CustomerService.name);
    /**
     * Constructor for Customer services 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(CustomerEntity) private repository: Repository<CustomerEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

        /**
         * Creates new customer in database
         * @param data 
         * @returns 
         */
    async create(data: CustomerDto): Promise<CustomerEntity> {
        return this.repository.save(data);
    }

    /**
     * Find a customer based on id
     * @param id 
     * @returns 
     */
    async findById(id: number): Promise<CustomerEntity> {
        return this.repository.findOne({ id });
    }

    /**
     * Find all the customers 
     * @returns 
     */
    async findAll(): Promise<Array<CustomerEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }
    /**
     * Remove a customer from database
     * @param id 
     * @returns 
     */
    async remove(id: number): Promise<CustomerEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates a customer field based on new data 
     * @param data 
     * @returns 
     */
    async update(data: CustomerDto): Promise<CustomerEntity> {
        const id: number = _.result(data,'id',0);
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Customer id: ${id} not found`,
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
    async paginate(state: StateDto): Promise<Pagination<CustomerEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<CustomerEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}