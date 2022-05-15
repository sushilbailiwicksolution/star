import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entity/user.entity";
import * as _ from "lodash";
import { UserTypeEnum } from "../../../enum/user.type.enum";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

    async create(data: UserDto): Promise<UserEntity> {
        return this.repository.save(data);
    }
    async findById(id: number): Promise<UserEntity> {
        return this.repository.findOne({ id });
    }
    async findByAccountType(accountType: UserTypeEnum): Promise<UserEntity> {
        console.log('account type: ', accountType);
        return this.repository.findOne({ status: StatusEnum.ACTIVE, accountType });
    }
    async findAll(): Promise<Array<UserEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }
    async remove(id: number): Promise<UserEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }
    async update(data: UserDto): Promise<UserEntity> {
        const id: number = _.result(data,'id',0);
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `User id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        return this.repository.save(layer);
    }
    async paginate(state: StateDto): Promise<Pagination<UserEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<UserEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}