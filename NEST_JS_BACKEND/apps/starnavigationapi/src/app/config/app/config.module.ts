import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { AppConfigService } from './configuration.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_NAME: Joi.string().default('application-service/secured'),
                APP_ENV: Joi.string()
                    .valid('development', 'production', 'test', 'provision')
                    .default('development'),
                APP_URL: Joi.string().default('http://my-app.test'),
                APP_PORT: Joi.number().default(3333),
                FRONTEND_APP_PATH: Joi.string().default('/home/star/nestjs/client'),
            })
        })
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService]
})
export class AppConfigModule {

}