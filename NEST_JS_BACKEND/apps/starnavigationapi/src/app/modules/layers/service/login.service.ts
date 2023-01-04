import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryBuilder } from "../../../service/query.builder.service";
import { UserLogin } from "../entity/login.entity";
import * as _ from "lodash";
import { LoginDto } from "../dto/login.dto";


/**
 * @ignore
 */
@Injectable()
export class LoginService {
    private readonly logger = new Logger(LoginService.name);
    constructor(
        @InjectRepository(UserLogin) private repository: Repository<UserLogin>,
        private readonly queryBuilderService: QueryBuilder) { }
    async validate(payload: LoginDto){
        try{
            const loginData = await this.repository.find();
           
            // console.log(loginData)
          const loginAttempt = await loginData.find(validUser =>{
           if(validUser.username===payload.username){
            if(validUser.username && validUser.password===payload.password){
                return true
            }
            else{
                return false
            }
           } else{return false}
        })
          if(loginAttempt){return payload}else{ return new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: `User not found`,
        }, HttpStatus.FORBIDDEN);};
        }
        catch(err){console.log(err.message)}
    }
    // async create(data: LoginDto): Promise<UserLogin> {
    //     return this.repository.save(data);
    // }
    async findById(id: number): Promise<UserLogin> {
        return this.repository.findOne({ id });
    }
    async update(data: LoginDto): Promise<UserLogin> {
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
    async findAll(): Promise<Array<UserLogin>> {
        return this.repository.find();
    }
    async remove(id: number): Promise<UserLogin> {
        return this.findById(id);
    }
}