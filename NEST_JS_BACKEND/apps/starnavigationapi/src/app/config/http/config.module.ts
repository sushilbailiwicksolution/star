import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { HttpConfigService } from './configuration.service';


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                HTTP_TIMEOUT: Joi.number().default(5000),
                HTTP_MAX_REDIRECTS: Joi.number().default(5),
            })
        })
    ],
    providers: [ConfigService, HttpConfigService],
    exports: [ConfigService, HttpConfigService]
})

/**
 * Contains http timeout and maxredirects
 */
export class HttpConfigModule {

}