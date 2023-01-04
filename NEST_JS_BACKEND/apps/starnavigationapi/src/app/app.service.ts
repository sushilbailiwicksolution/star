import { Injectable } from '@nestjs/common';
import { MsgResDto } from './msg.res.dto';

/**
 * This class returns with a message and name 
 */
@Injectable()
export class AppService {
  /**
   * This returns message and name 
   * @returns {message: string , name:string}
   */
  getData(): MsgResDto {
    return { message: 'Welcome to starnavigationapi!', name: 'StarNavigationSystem' };
  }
}
