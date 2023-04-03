import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseType, getMetadataArgsStorage } from 'typeorm';
import { MySqlConfigModule } from '../../../config/database/mysql/config.module';
import { MySqlConfigService } from '../../../config/database/mysql/configuration.service';


/**
 * @module This is TypeOrm module for database connectivity
 * @class This class is exported as MysqlDatabaseProviderModule
 */
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [MySqlConfigModule],
            inject: [MySqlConfigService],
            name: "default",
            useFactory: async (mysqlConfigService: MySqlConfigService) => ({
                type: 'mysql' as DatabaseType,
                host: mysqlConfigService.host,
                port: mysqlConfigService.port,
                username: mysqlConfigService.username,
                password: mysqlConfigService.password,
                database: mysqlConfigService.dbname,
                logging: mysqlConfigService.logging,
                synchronize: mysqlConfigService.synchronize,
                entities: getMetadataArgsStorage().tables.filter(t => 'sample'!==t.name).map(tbl => tbl.target)
            })
        } as TypeOrmModuleAsyncOptions),
        TypeOrmModule.forRootAsync({
            imports: [MySqlConfigModule],
            inject: [MySqlConfigService],
            name: 'secondary',
            useFactory: async (mysqlConfigService: MySqlConfigService) => ({
                type: 'mysql' as DatabaseType,
                host: process.env.DATABASE_SHOST,
                port: process.env.DATABASE_SPORT,
                username: process.env.DATABASE_SUSERNAME,
                password: process.env.DATABASE_SPASSWORD,
                database: process.env.DATABASE_SDBNAME,
                logging: process.env.DB_SSYNCHRONIZE,
                synchronize: process.env.DB_SLOGGING,
                entities: getMetadataArgsStorage().tables.filter(t => 'sample'===t.name).map(tbl => tbl.target)
            })
        } as TypeOrmModuleAsyncOptions)
    ]
})
export class MysqlDatabaseProviderModule {}