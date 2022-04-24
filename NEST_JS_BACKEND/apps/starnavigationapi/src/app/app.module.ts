import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { LoggerMiddleware } from './middleware/logs.middleware';
import { LayerModule } from './modules/layers/layer.module';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join('/home/star/nestjs', 'client')/*,
      exclude: ['/application-service/secured*']*/
    }),
    MysqlDatabaseProviderModule,
    LayerModule,
    AppConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }

}