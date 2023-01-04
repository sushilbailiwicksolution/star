import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @ignore 
 */
@Injectable()
/**
 * This class returns with all the configService required to make connection 
 */
export class PostgresSqlConfigService {
    constructor(private configService: ConfigService) { }

    get host(): string {
        return this.configService.get<string>('postgres.host');
    }
    get port(): number {
        return Number(this.configService.get<number>('postgres.port'));
    }
    get username(): string {
        return this.configService.get<string>('postgres.username');
    }
    get password(): string {
        return this.configService.get<string>('postgres.password');
    }
    get dbname(): string {
        return this.configService.get<string>('postgres.dbname');
    }
    get synchronize(): boolean {
        return this.configService.get<boolean>('postgres.synchronize');
    }
    get logging(): string {
        return this.configService.get<string>('postgres.logging');
    }
}