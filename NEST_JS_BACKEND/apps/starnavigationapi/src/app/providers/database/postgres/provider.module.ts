import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseType, getMetadataArgsStorage } from 'typeorm';
import { PostgresSQLConfigModule } from '../../../config/database/postgres/config.module';
import { PostgresSqlConfigService } from '../../../config/database/postgres/configuration.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [PostgresSQLConfigModule],
            useFactory: async (postgresConfigService: PostgresSqlConfigService) => ({
                type: 'postgres' as DatabaseType,
                host: postgresConfigService.host,
                port: postgresConfigService.port,
                username: postgresConfigService.username,
                password: postgresConfigService.password,
                database: postgresConfigService.dbname,
                logging: postgresConfigService.logging,
                synchronize: postgresConfigService.synchronize,
                entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
            }),
            inject: [PostgresSqlConfigService],
            } as TypeOrmModuleAsyncOptions)
    ]
})
export class PostgresDatabaseProviderModule {}