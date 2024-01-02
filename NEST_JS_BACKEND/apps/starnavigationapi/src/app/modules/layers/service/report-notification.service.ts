import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportNotificationDto } from '../dto/report-notification.dto';
import { ReportNotification } from '../entity/report-notification.entity';

@Injectable()
export class ReportNotificationService {
  constructor(
    @InjectRepository(ReportNotification)
    private readonly reportNotificationRepository: Repository<ReportNotification>,
  ) {}

  async create(dto: ReportNotificationDto): Promise<ReportNotification> {
  const notificationIds = dto.notifications.map((notification) => notification.id);

    const reportNotification = this.reportNotificationRepository.create({
      createdBy: dto.createdBy,
      customerName: dto.customerName,
      customerId:dto.customerId,
      notificationIds: notificationIds,
      report: dto.report,
    });

    return this.reportNotificationRepository.save(reportNotification);
  }

  async update(
    customerId: number,
    reportName: string,
    data: ReportNotificationDto,
  ): Promise<ReportNotification | null> {
    const notificationIds = data.notifications.map((notification) => notification.id);

    const existingRecord = await this.reportNotificationRepository.findOne({
      where: { customerId: customerId, report: reportName },
    });

    if (!existingRecord) {
      return null;
    }

    existingRecord.customerName = data.customerName;
    existingRecord.notificationIds = notificationIds;

    return this.reportNotificationRepository.save(existingRecord);
  }

  async getByCustomerIdAndReportName(
    customerId: number,
    reportName: string,
  ): Promise<ReportNotification | null> {
    return this.reportNotificationRepository.findOne({
      where: { customerId: customerId, report: reportName },
    });
  }
}
