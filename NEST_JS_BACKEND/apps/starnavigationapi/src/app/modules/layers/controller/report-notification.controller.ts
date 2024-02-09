import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ReportNotification } from '../entity/report-notification.entity';
import { ReportNotificationDto } from '../dto/report-notification.dto';
import { ReportNotificationService } from '../service/report-notification.service';

@ApiTags('Report Notifications')
@Controller('report-notifications')
export class ReportNotificationController {
  constructor(private readonly reportNotificationService: ReportNotificationService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: ReportNotification })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() data: ReportNotificationDto): Promise<ReportNotification> {
    return this.reportNotificationService.create(data);
  }

  @Put(':customerId/:reportName')
  @ApiResponse({ status: 200, description: 'Updated', type: ReportNotification })
  @ApiNotFoundResponse({ description: 'Report not found' })
  async update(
    @Param('customerId') customerId: number,
    @Param('reportName') reportName: string,
    @Body() data: ReportNotificationDto,
  ): Promise<ReportNotification | null> {
    return this.reportNotificationService.update(customerId, reportName, data);
  }

  @Get(':customerId/:reportName')
  @ApiResponse({ status: 200, description: 'OK', type: ReportNotification })
  @ApiNotFoundResponse({ description: 'Report not found' })
  async get(
    @Param('customerId') customerId: number,
    @Param('reportName') reportName: string,
  ): Promise<ReportNotification | null> {
    return this.reportNotificationService.getByCustomerIdAndReportName(customerId, reportName);
  }

}
