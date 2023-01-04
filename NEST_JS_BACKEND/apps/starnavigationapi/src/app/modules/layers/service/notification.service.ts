import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { IsNull, Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { NotificationDto } from "../dto/notification.dto";
import { NotificationEmailEntity } from "../entity/notification.email.entity";
import { NotificationEntity } from "../entity/notification.entity";
import { NotificationTemplateEntity } from "../entity/notification.template.entity";
import { UserEntity } from "../entity/user.entity";
import * as _ from "lodash";

/**
 * NotificationService consist of methods for notification API
 */
@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    /**
     * This is constructor for notification services 
     * @param repository 
     * @param templateRepository 
     * @param notiEmailRepository 
     * @param userRepository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(NotificationEntity) private repository: Repository<NotificationEntity>,
        @InjectRepository(NotificationTemplateEntity) private templateRepository: Repository<NotificationTemplateEntity>,
        @InjectRepository(NotificationEmailEntity) private notiEmailRepository: Repository<NotificationEmailEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

        /**
         * This creates new notification in database
         * @param {object}data Takes data as input from API  
         * @returns with a Nofitication based on data 
         */
    async create(data: NotificationDto): Promise<NotificationEntity> {
        console.log('data: ', data);
        const emailTemplate = await this.templateRepository.findOne({id: data.emailTemplateId});
        const smsTemplate = await this.templateRepository.findOne({id: data.smsTemplateId});
        data.emailTemplate = emailTemplate;
        data.smsTemplate = smsTemplate;
        const notification = await this.repository.save(data);
        return notification;
    }
    /**
     * This method is used to find notification by provided id
     * @param {number}id Takes id as input from GUI 
     * @returns  with the notification found based on id provided 
     */
    async findById(id: number): Promise<NotificationEntity> {
        return this.repository.findOne({ id: id, status: StatusEnum.ACTIVE });
    }

    /**
     * Finds all the notification 
     * @returns All the notification found in database.
     */
    async findAll(): Promise<Array<NotificationEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }

    /**
     * Delete a notification based on id 
     * This deletes notification based on id provided
     * @param {number}id Checks for the id provided from GUI into database
     * @returns  Deletes the respective id found in database and update it 
     */
    async remove(id: number): Promise<NotificationEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
/**
 * Updates notification based on id provided 
 * @param {number}id Checks for the id  
 * @param {object}data New Data provided 
 * @returns  Updates the database
 */

    async update(id: number, data: NotificationDto): Promise<NotificationEntity> {
        
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Notification id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        const notification = await this.repository.save(layer);
        await this.notiEmailRepository.delete({notification: IsNull()});
       
        return notification;
    }
    /**
     * For paginate
     * @ignore
     * @param state 
     * @returns 
     */
    async paginate(state: StateDto): Promise<Pagination<NotificationEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<NotificationEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}