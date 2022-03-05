import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpConfigService {
    constructor(private configService: ConfigService) { }

    get timeout(): number {
        return Number(this.configService.get<number>('http.timeout'));
    }
    get maxRedirects(): number {
        return Number(this.configService.get<number>('http.max.redirects'));
    }
}