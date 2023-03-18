import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { LoggerMiddleware } from './middleware/logs.middleware';
import { LayerModule } from './modules/layers/layer.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';

/**
 * @description This module serve the client folder on root URL
 * @module This module is serving react GUI on root port 
 */
@Module({
  imports: [
    ServeStaticModule.forRoot({
      
      rootPath: join('', 'client')
    }),
   
    PostgresDatabaseProviderModule,
    LayerModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

/**
 * @class AppModule integrate AppModule with nestjs default NestModule 
 */
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }

}