import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { PostgresSqlConfigService } from './configuration.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().default('localhost'),
                POSTGRES_PORT: Joi.number().default('3306'),
                POSTGRES_USERNAME: Joi.string().default('root'),
                POSTGRES_PASSWORD: Joi.string().default(''),
                POSTGRES_DBNAME: Joi.string().default('star_s'),
                DB_SYNCHRONIZE: Joi.boolean().default(true),
                DB_LOGGING: Joi.boolean().default(true),
            })
        })
    ],
    providers: [ConfigService, PostgresSqlConfigService],
    exports: [ConfigService, PostgresSqlConfigService]
})
export class PostgresSQLConfigModule {

}