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
                POSTGRES_HOST: Joi.string().default('103.10.234.158'),
                POSTGRES_PORT: Joi.number().default('5432'),
                POSTGRES_USERNAME: Joi.string().default('star'),
                POSTGRES_PASSWORD: Joi.string().default('Admin@123'),
                POSTGRES_DBNAME: Joi.string().default('starapi'),
                DB_SYNCHRONIZE: Joi.boolean().default(true),
                DB_LOGGING: Joi.boolean().default(true),
            })
        })
    ],
    providers: [ConfigService, PostgresSqlConfigService],
    exports: [ConfigService, PostgresSqlConfigService]
})

/**
 * This class config connectivity to postgres database 
 */
export class PostgresSQLConfigModule {

}