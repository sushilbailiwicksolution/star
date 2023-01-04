import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { NotificationTemplateEntity } from "../entity/notification.template.entity";
import { NotificationTemplateDto } from "../dto/notification.template.dto";
import * as _ from "lodash";


/**
 *  This class handles functions of Notification based API Queries.
 * @class
 */
@Injectable()

export class NotificationTemplateService {
    private readonly logger = new Logger(NotificationTemplateService.name);
    /**
     * Constructor for notifciation template 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(NotificationTemplateEntity) private repository: Repository<NotificationTemplateEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

        /**
         * Takes  data as input and create new notification in database
         * @param data 
         * @returns Saves the notification data into database 
         */
    async create(data: NotificationTemplateDto): Promise<NotificationTemplateEntity> {
        return this.repository.save(data);
    }
     /**
      * Finds by id
      * @param id Find a notification based on id provided 
      * @returns With the notification found by the respective id in database.
      */

    async findById(id: number): Promise<NotificationTemplateEntity> {
        return this.repository.findOne({ id });
    }

    /**
     * Finds all the notification
     * @returns Find all the notification in database 
     */
    async findAll(): Promise<Array<NotificationTemplateEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }

    /**
     * Remove notification based on id provided
     * @param id Search for a notification based on the provided id
     * @returns  It delete the respective notification and update the database.
     */
    async remove(id: number): Promise<NotificationTemplateEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates database with new entries based on id 
     * @param {number}id Search for notification based on id 
     * @param {object}data  To be updated data for notification. 
     * @returns It updates the database with new entries 
     */
    async update(id: number, data: NotificationTemplateDto): Promise<NotificationTemplateEntity> {
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Notification template id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        return this.repository.save(layer);
    }

    /**
     * For paginate 
     * @param state CreateQueryBuilder based on state data provided
     * @returns With new paginate 
     */
    async paginate(state: StateDto): Promise<Pagination<NotificationTemplateEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<NotificationTemplateEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}