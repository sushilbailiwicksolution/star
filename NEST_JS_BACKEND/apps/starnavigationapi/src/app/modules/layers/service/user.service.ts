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
import { LoginDto } from "../dto/login.dto";

/**
 * This class consist of methods which verify user login creation and also to find users
 * @class UserService  
 */

@Injectable()
export class UserService {


    private readonly logger = new Logger(UserService.name);
    /**
     * Constructor for user services 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
        private readonly queryBuilderService: QueryBuilder) { }

        /**
         * This method is used to create new user
         * @param data UserDto is used as param for create function 
         * @returns This saves new user into database respective to entries made in UserDto fields.
         */
    async create(data: UserDto): Promise<UserEntity> {
        return this.repository.save(data);
    }

    /**
     * This method is used to find individual user based on id
     * @param {number} id Find user by the provided id
     * @returns The user with provided id 
     */
    async findById(id: number): Promise<UserEntity> {
        return this.repository.findOne({ id });
    }
    /**
     * Find a user based on account type
     * @param {object} accountType 
     * @returns Find user based on accountType and the account status.
     */
    async findByAccountType(accountType: UserTypeEnum): Promise<UserEntity> {
        console.log('account type: ', accountType);
        return this.repository.findOne({ status: StatusEnum.ACTIVE, accountType });
    }
    /**Find all the user exist in database
     * @returns All the users in the database 
     */
    async findAll(): Promise<Array<UserEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }
    /**
     * Remove a user from database
     * @param {number}id Takes id and delete the user if found in database 
     * @returns Updates the database after the provoded id user is deleted.
     */
    async remove(id: number): Promise<UserEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Update new entries for a user in database based on id
     * @param data Updates the database with new detail of user
     * @returns  It saves updated entries of user into database
     */
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

    /**
     * For user paginate 
     * @param state Uses StateDto
     * @returns With updated paginate.
     */
    async paginate(state: StateDto): Promise<Pagination<UserEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<UserEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }

    /**
     * This is used to validate user login 
     * @param {JSON}payload Takes user input at login GUI  
     * @returns With a data if match found else returns with HTTP exception
     */
    async validate(payload: LoginDto){
        try{
            const loginData = await this.repository;
           const {username , password} = payload
            // console.log(loginData)
            // This functions checks for user 
          const user = await loginData.findOne({username ,password})
          if(user){return user}else{ return new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: `User not found`,
        }, HttpStatus.FORBIDDEN);};
        }
        catch(err){console.log(err.message)}
    }
}