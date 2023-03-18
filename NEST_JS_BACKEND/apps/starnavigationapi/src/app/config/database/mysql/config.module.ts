import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { MySqlConfigService } from './configuration.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                MYSQL_HOST: Joi.string().default('localhost'),
                MYSQL_PORT: Joi.number().default('3306'),
                MYSQL_USERNAME: Joi.string().default('root'),
                MYSQL_PASSWORD: Joi.string().default(''),
                MYSQL_DBNAME: Joi.string().default('star_s'),
                DB_SYNCHRONIZE: Joi.boolean().default(true),
                DB_LOGGING: Joi.boolean().default(true),
            })
        })
    ],
    providers: [ConfigService, MySqlConfigService],
    exports: [ConfigService, MySqlConfigService]
})

/**
 * This class is for mysql database connectivity 
 */
export class MySqlConfigModule {

}