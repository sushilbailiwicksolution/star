import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { EventNotificationMainDto } from '../dto/event.notification.dto';
import { EventNotificationService } from '../service/eventNotification.service';
import { EventBasedNotificationEntity } from '../entity/event.based.notification.entity';

@ApiTags('Event Notifications')
@Controller('event-notifications')
export class EventNotificationController {
  constructor(private readonly eventNotificationService: EventNotificationService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: EventBasedNotificationEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() data: EventNotificationMainDto): Promise<EventBasedNotificationEntity> {
    return this.eventNotificationService.create(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK', type: EventBasedNotificationEntity })
  @ApiNotFoundResponse({ description: 'Event Notification not found' })
  findById(@Param('id') id: number): Promise<EventBasedNotificationEntity> {
    return this.eventNotificationService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [EventBasedNotificationEntity] })
  findAll(): Promise<EventBasedNotificationEntity[]> {
    return this.eventNotificationService.findAll();
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'OK', type: EventBasedNotificationEntity })
  @ApiNotFoundResponse({ description: 'Event Notification not found' })
  update(
    @Param('id') id: number,
    @Body() data: EventNotificationMainDto
  ): Promise<EventBasedNotificationEntity> {
    return this.eventNotificationService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'OK', type: EventBasedNotificationEntity })
  @ApiNotFoundResponse({ description: 'Event Notification not found' })
  remove(@Param('id') id: number): Promise<EventBasedNotificationEntity> {
    return this.eventNotificationService.remove(id);
  }
}
