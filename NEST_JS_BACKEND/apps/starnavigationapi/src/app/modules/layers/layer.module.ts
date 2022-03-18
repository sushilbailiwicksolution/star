import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilder } from '../../service/query.builder.service';
import { LandmarkController } from './controller/landmark.controller';
import { LayerController } from './controller/layer.controller';
import { LandmarkEntity } from './entity/landmark.entity';
import { LayerEntity } from './entity/layer.entity';
import { LandmarkService } from './service/landmark.service';
import { LayerService } from './service/layer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LayerEntity, LandmarkEntity
        ])
    ],
    providers: [LayerService, QueryBuilder, LandmarkService],
    exports: [TypeOrmModule],
    controllers: [LayerController, LandmarkController]
})
export class LayerModule {

}