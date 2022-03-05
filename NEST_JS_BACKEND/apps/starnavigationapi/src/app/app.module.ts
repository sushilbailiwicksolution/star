import { HttpModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../apps/starnavigationapi', 'client'),
      exclude: ['/api*']
    }),
    MysqlDatabaseProviderModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }