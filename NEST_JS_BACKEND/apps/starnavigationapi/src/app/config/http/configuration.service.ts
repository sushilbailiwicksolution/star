import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * This is HTTP ConfigService class
 * @class HttpConfig 
 * @method timeout 
 * @method maxRedirects
 * @returns {number}
 * @ignore
 */
@Injectable()

export class HttpConfigService {
    constructor(private configService: ConfigService) { }

    /**
     * HTTP timeout method
     * * @method timeout 
     * @returns {number}
     */
    get timeout(): number {
        return Number(this.configService.get<number>('http.timeout'));
    }
    /**
     * Http redirect method 
     * @method maxRedirects
     * @returns {number}
     */
    get maxRedirects(): number {
        return Number(this.configService.get<number>('http.max.redirects'));
    }
}