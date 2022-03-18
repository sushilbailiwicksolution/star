import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseType, getMetadataArgsStorage } from 'typeorm';
import { MySqlConfigModule } from '../../../config/database/mysql/config.module';
import { MySqlConfigService } from '../../../config/database/mysql/configuration.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [MySqlConfigModule],
            useFactory: async (mysqlConfigService: MySqlConfigService) => ({
                type: 'mysql' as DatabaseType,
                host: mysqlConfigService.host,
                port: mysqlConfigService.port,
                username: mysqlConfigService.username,
                password: mysqlConfigService.password,
                database: mysqlConfigService.dbname,
                logging: mysqlConfigService.logging,
                synchronize: mysqlConfigService.synchronize,
                entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
            }),
            inject: [MySqlConfigService],
            } as TypeOrmModuleAsyncOptions)
    ]
})
export class MysqlDatabaseProviderModule {}