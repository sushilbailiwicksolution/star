import { Controller, Get, UseInterceptors, } from '@nestjs/common';

import { AppService } from './app.service';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { MessageDto } from './message.dto';
/**
 * This is controller class  uses Appservice as constructor .
 * 
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

/**
 * With value inside MessageDto.
 * @returns 
 */
  @Get()
  @UseInterceptors(new TransformInterceptor(MessageDto))
  getData(): MessageDto{
    return this.appService.getData();
  }
}
