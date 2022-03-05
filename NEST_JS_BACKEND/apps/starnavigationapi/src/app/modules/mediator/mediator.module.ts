import { Module } from '@nestjs/common';
import { MediatorController } from './mediator.controller';
import { MediatorService } from './mediator.service';

@Module({
    imports: [
       
    ],
    providers: [
        MediatorService
    ],
    exports: [
        
    ],
    controllers: [
        MediatorController
    ]
})
export class MediatorModule {

}