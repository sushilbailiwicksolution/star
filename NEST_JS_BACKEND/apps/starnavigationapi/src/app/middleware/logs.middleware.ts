import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * This is a logger middleware class which returns with a message based on checking status code 
 * @ignore
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
 
  /**
   * Returns a message based
   * @argument request
   * @argument response
   * @argument next
   * @ignore 
   */
  use(request: Request, response: Response, next: NextFunction) {
    /**
     * Callback function 
     * @callback
     */
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;
 
      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
 
      if (statusCode >= 500) {
        return this.logger.error(message);
      }
 
      else if (statusCode >= 400) {
        return this.logger.warn(message);
      }
 
      else return this.logger.log(message);
    });
 
    next();
  }
}