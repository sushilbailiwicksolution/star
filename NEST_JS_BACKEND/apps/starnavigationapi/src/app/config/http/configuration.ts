import { registerAs } from '@nestjs/config';
export default registerAs('http', () => ({
    timeout: process.env.HTTP_TIMEOUT,
    maxRedirects: process.env.HTTP_MAX_REDIRECTS
}));