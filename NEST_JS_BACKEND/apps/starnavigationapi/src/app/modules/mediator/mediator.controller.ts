import { Controller, Get } from '@nestjs/common';
import { MediatorService } from './mediator.service';


/**
 * @ignore
 */

@Controller('mediator')
export class MediatorController {

    constructor(private mediatorService: MediatorService) { }

    @Get()
    public async findAll() {
        return null;
    }

}