import { registerAs } from '@nestjs/config';

/**
 * Contains timeout and maxredirect arguments for http request 
 */
export default registerAs('http', () => ({
    timeout: process.env.HTTP_TIMEOUT,
    maxRedirects: process.env.HTTP_MAX_REDIRECTS
}));