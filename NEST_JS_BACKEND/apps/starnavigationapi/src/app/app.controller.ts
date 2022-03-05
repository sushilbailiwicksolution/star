import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { MessageDto } from './message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(MessageDto))
  getData(): MessageDto{
    return this.appService.getData();
  }
}
