import { Injectable } from '@nestjs/common';
import { MsgResDto } from './msg.res.dto';

@Injectable()
export class AppService {
  getData(): MsgResDto {
    return { message: 'Welcome to starnavigationapi!', name: 'Vivek Kumar' };
  }
}
