import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilder } from '../../service/query.builder.service';
import { AplController } from './controller/apl.controller';
import { AssetController } from './controller/asset.controller';
import { CustomerController } from './controller/customer.controller';
import { EventDetailController } from './controller/event.detail.controller';
import { GeofenceController } from './controller/geofence.controller';
import { GroupController } from './controller/group.controller';
import { LandmarkController } from './controller/landmark.controller';
import { LayerController } from './controller/layer.controller';
import { NewLayerController } from './controller/newlayer.controller';
import { NotificationController } from './controller/notification.controller';
import { NotificationTemplateController } from './controller/notification.template.controller';
import { UserController } from './controller/user.controller';
import { AplEntity } from './entity/apl.entity';
import { AplItemEntity } from './entity/apl.item.entity';
import { AssetEntity } from './entity/asset.entity';
import { CustomerEntity } from './entity/customer.entity';
import { EventDetailsEntity } from './entity/event.details.entity';
import { EventParamDetailsEntity } from './entity/event.param.details.entity';
import { FlighLocationEntity } from './entity/fligh.location.entity';
import { FlighPlanEntity } from './entity/flight.plan.entity';
import { GeofenceAssetEntity } from './entity/genfence.asset.entity';
import { GeofenceEntity } from './entity/geofence.entity';
import { GeofenceNotificationEntity } from './entity/geofence.notification.entity';
import { GroupEntity } from './entity/group.entity';
import { LandmarkEntity } from './entity/landmark.entity';
import { LayerEntity } from './entity/layer.entity';
import { LayerData, NLayer, ProductData} from './entity/newlayer.entity';
import { NotificationEmailEntity } from './entity/notification.email.entity';
import { NotificationEntity } from './entity/notification.entity';
import { NotificationTemplateEntity } from './entity/notification.template.entity';
import { NotificationUserEntity } from './entity/notification.user.entity';
import { UserEntity } from './entity/user.entity';
import { AplService } from './service/apl.service';
import { AssetService } from './service/asset.service';
import { CustomerService } from './service/customer.service';
import { EventDetailService } from './service/event.detail.service';
import { GeofenceService } from './service/geofence.service';
import { GroupService } from './service/group.service';
import { LandmarkService } from './service/landmark.service';
import { LayerService } from './service/layer.service';
import { NewLayerService } from './service/newlayer.service';
import { NewUserService } from './service/newUser.service';
import { NotificationService } from './service/notification.service';
import { NotificationTemplateService } from './service/notification.template.service';
import { UserService } from './service/user.service';

/**
 * @ignore
 */

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NLayer,LayerData,ProductData,
            LayerEntity, LandmarkEntity, NotificationEmailEntity, NotificationEntity, 
            NotificationTemplateEntity, GeofenceEntity, AplEntity, AplItemEntity, AssetEntity, CustomerEntity,
            EventDetailsEntity, EventParamDetailsEntity, FlighLocationEntity, FlighPlanEntity, UserEntity, GroupEntity,
            CustomerEntity, NotificationUserEntity, GeofenceNotificationEntity, GeofenceAssetEntity, AssetEntity
        ])
    ],
    providers: [
      NewLayerService,NewUserService,
        LayerService, QueryBuilder, LandmarkService, NotificationService, NotificationTemplateService,
        AssetService, UserService, GroupService, CustomerService, AplService, EventDetailService, GeofenceService
    ],
    exports: [TypeOrmModule],
    controllers: [
       NewLayerController,
        LayerController, LandmarkController, NotificationController, NotificationTemplateController, 
        AssetController, UserController, GroupController, CustomerController, AplController, EventDetailController,
        GeofenceController, AssetController
    ]
})
export class LayerModule {

}