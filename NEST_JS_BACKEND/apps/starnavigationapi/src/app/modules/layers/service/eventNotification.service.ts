import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import * as _ from "lodash";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { EventNotificationMainDto } from "../dto/event.notification.dto";
import { EventBasedNotificationEntity } from "../entity/event.based.notification.entity";

import { EventNotificationEntity } from "../entity/event.notification.entity";
import { NotificationEntity } from "../entity/notification.entity";
import { EventAssetEntity } from "../entity/event.asset.entity";
import { AssetEntity } from "../entity/asset.entity";
import { CustomerEntity } from "../entity/customer.entity";


/**
 * This class contains methods for event notification services
 * @class EventNotificationService
 */
@Injectable()
export class EventNotificationService {
  private readonly logger = new Logger(EventNotificationService.name);

  /**
   * Constructor for event notification service 
   * @param repository 
   * @param queryBuilderService 
   */
  constructor(
    @InjectRepository(EventBasedNotificationEntity)
    private repository: Repository<EventBasedNotificationEntity>,
    private readonly queryBuilderService: QueryBuilder
  ) {}

  /**
   * Create a new event notification 
   * @param data 
   * @returns 
   */
  // async create(data: EventNotificationMainDto): Promise<EventBasedNotificationEntity> {
  //   data.vehicles.forEach(o => {
  //       o = Object.assign(o, {assetId: o.id})
  //       _.omit(o, ['id']);
  //   });
  //   data.notifications.forEach(o => {
  //       o = Object.assign(o, {notificationId: o.id})
  //       _.omit(o, ['id']);
  //   });
  //   const geofence: EventBasedNotificationEntity = Object.assign(data);
  //   const notification = await this.repository.save(geofence);
  //   return notification;
  // }

  // service
async create(data: EventNotificationMainDto): Promise<EventBasedNotificationEntity> {
  // First, create the EventBasedNotificationEntity
  const eventNotification = new EventBasedNotificationEntity();
  eventNotification.name = data.name;
  eventNotification.customerId = data.customerId;
  eventNotification.customerName = data.customerName;
  eventNotification.eventId = data.eventId;
  eventNotification.eventName = data.eventName;

  // Create and associate the EventAssetEntity instances
  const vehicles = data.vehicles.map((vehicleData) => {
    const eventAsset = new EventAssetEntity();
    eventAsset.assetId = vehicleData.id; 
    return eventAsset;
  });
  eventNotification.vehicles = vehicles;

  // Create and associate the EventNotificationEntity instances
  const notifications = data.notifications.map((notificationData) => {
    const eventNotificationEntity = new EventNotificationEntity();
    eventNotificationEntity.notificationId = notificationData.id; 
    return eventNotificationEntity;
  });
  eventNotification.notifications = notifications;

  // Save the EventBasedNotificationEntity and its associations in the database
  const savedEventNotification = await this.repository.save(eventNotification);
  return savedEventNotification;
}


  /**
   * Find an event notification by ID
   * @param id 
   * @returns 
   */
  async findById(id: number): Promise<EventBasedNotificationEntity> {
    return this.repository
      .createQueryBuilder("t")
      .leftJoinAndMapMany(
        "t.notifications",
        EventNotificationEntity,
        "n",
        "t.id = n.event_id"
      )
      .leftJoinAndMapOne(
        "n.notification",
        NotificationEntity,
        "notification",
        "n.notification_id = notification.id"
      )
      .leftJoinAndMapMany(
        "t.assets",
        EventAssetEntity,
        "a",
        "t.id = a.event_id"
      )
      .leftJoinAndMapOne("a.asset", AssetEntity, "asset", "a.asset_id = asset.id")
      .where("t.id = :id", { id })
      .where('t.status = :status', {status: StatusEnum.ACTIVE})
      .getOne();
  }

  /**
   * Find all event notifications in the database
   * @returns 
   */
  async findAll(): Promise<Array<EventBasedNotificationEntity>> {
    return this.repository.createQueryBuilder('t')
        .leftJoinAndMapOne('t.customer',CustomerEntity,'customer','t.customer_id = customer.id')
        .leftJoinAndMapMany('t.notifications',EventNotificationEntity,'n','t.id  = n.event_id')
        .leftJoinAndMapOne('n.notification', NotificationEntity,'notification','n.notification_id  = notification.id')
        .leftJoinAndMapMany('t.vehicles',EventAssetEntity,'a','t.id  = a.event_id')
        .leftJoinAndMapOne('a.asset', AssetEntity,'asset','a.asset_id  = asset.id')
        .where('t.status = :status', {status: StatusEnum.ACTIVE})
        .getMany();
  }

  /**
   * Remove an event notification by ID
   * @param id 
   * @returns 
   */
  async remove(id: number): Promise<EventBasedNotificationEntity> {
    console.log("id: ", id);
    await this.repository
      .createQueryBuilder("t")
      .update(EventBasedNotificationEntity)
      .set({ status: StatusEnum.DELETED })
      .where("id = :id", { id })
      .execute();
    return this.findById(id);
  }

  /**
   * Update an event notification
   * @param id 
   * @param data 
   * @returns 
   */
  async update(id: number, data: EventNotificationMainDto): Promise<EventBasedNotificationEntity> {
    data = _.omit(data, ["id"]);
    data.vehicles.forEach((o) => {
      o = Object.assign(o, { assetId: o.id });
      _.omit(o, ["id"]);
    });
    data.notifications.forEach((o) => {
      o = Object.assign(o, { notificationId: o.id });
      _.omit(o, ["id"]);
    });
    let event = await this.findById(id);
    this.logger.log(`update: ${JSON.stringify(event)}`);
    if (event == null) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Event notification id: ${id} not found`,
        },
        HttpStatus.FORBIDDEN
      );
    }
    event = Object.assign(event, data);
    const notification = await this.repository.save(event);
    return notification;
  }

  /**
   * @ignore
   * @param state 
   * @returns 
   */
  async paginate(state: StateDto): Promise<Pagination<EventBasedNotificationEntity>> {
    const options = { page: state.page.current, limit: state.page.size };
    const queryBuilder = this.repository.createQueryBuilder("t");
    return await paginate<EventBasedNotificationEntity>(
      this.queryBuilderService.getQuery(state, queryBuilder),
      options
    );
  }
}
