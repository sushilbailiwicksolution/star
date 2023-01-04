import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @ignore
 */
@Injectable()
/**
 * ALl the details required to make connection with mysql database is inside this class.
 */
export class MySqlConfigService {
    constructor(private configService: ConfigService) { }

    get host(): string {
        return this.configService.get<string>('mysql.host');
    }
    get port(): number {
        return Number(this.configService.get<number>('mysql.port'));
    }
    get username(): string {
        return this.configService.get<string>('mysql.username');
    }
    get password(): string {
        return this.configService.get<string>('mysql.password');
    }
    get dbname(): string {
        return this.configService.get<string>('mysql.dbname');
    }
    get synchronize(): boolean {
        return this.configService.get<boolean>('mysql.synchronize');
    }
    get logging(): string {
        return this.configService.get<string>('mysql.logging');
    }
}