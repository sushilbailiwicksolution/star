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
                MYSQL_HOST: Joi.string().default(process.env.DATABASE_HOST),
                MYSQL_PORT: Joi.number().default(process.env.DATABASE_PORT),
                MYSQL_USERNAME: Joi.string().default(process.env.DATABASE_USERNAME),
                MYSQL_PASSWORD: Joi.string().default(process.env.DATABASE_PASSWORD),
                MYSQL_DBNAME: Joi.string().default(process.env.DATABASE_DBNAME),
                DB_SYNCHRONIZE: Joi.boolean().default(process.env.DB_SYNCHRONIZE),
                DB_LOGGING: Joi.boolean().default(process.env.DB_LOGGING),
                MYSQL_SHOST: Joi.string().default(process.env.DATABASE_SHOST),
                MYSQL_SPORT: Joi.number().default(process.env.DATABASE_SPORT),
                MYSQL_SUSERNAME: Joi.string().default(process.env.DATABASE_SUSERNAME),
                MYSQL_SPASSWORD: Joi.string().default(process.env.DATABASE_SPASSWORD),
                MYSQL_SDBNAME: Joi.string().default(process.env.DATABASE_SDBNAME),
                DB_SSYNCHRONIZE: Joi.boolean().default(process.env.DB_SSYNCHRONIZE),
                DB_SLOGGING: Joi.boolean().default(process.env.DB_SLOGGING),
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