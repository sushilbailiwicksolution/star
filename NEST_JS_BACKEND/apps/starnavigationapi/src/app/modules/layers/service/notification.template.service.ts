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

@Injectable()
export class NotificationTemplateService {
    private readonly logger = new Logger(NotificationTemplateService.name);
    constructor(
        @InjectRepository(NotificationTemplateEntity) private repository: Repository<NotificationTemplateEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

    async create(data: NotificationTemplateDto): Promise<NotificationTemplateEntity> {
        return this.repository.save(data);
    }
    async findById(id: number): Promise<NotificationTemplateEntity> {
        return this.repository.findOne({ id });
    }
    async findAll(): Promise<Array<NotificationTemplateEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }
    async remove(id: number): Promise<NotificationTemplateEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
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
    async paginate(state: StateDto): Promise<Pagination<NotificationTemplateEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<NotificationTemplateEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}