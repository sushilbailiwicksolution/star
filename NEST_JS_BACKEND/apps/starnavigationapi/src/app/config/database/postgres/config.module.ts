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
                POSTGRES_HOST: Joi.string().default(process.env.DATABASE_HOST),
                POSTGRES_PORT: Joi.number().default(process.env.DATABASE_PORT),
                POSTGRES_USERNAME: Joi.string().default(process.env.DATABASE_USERNAME),
                POSTGRES_PASSWORD: Joi.string().default(process.env.DATABASE_PASSWORD),
                POSTGRES_DBNAME: Joi.string().default(process.env.DATABASE_DBNAME),
                DB_SYNCHRONIZE: Joi.boolean().default(process.env.DB_SYNCHRONIZE),
                DB_LOGGING: Joi.boolean().default(process.env.DB_LOGGING),
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