/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param } from '@nestjs/common';
import { MediatorService } from './mediator.service';

/**
 * @ignore
 */

@Controller('getFlightDetails')
export class FlightDetailController {

    constructor(private mediatorService: MediatorService) { }

    @Get(':aircraftId')
    public async getFlightByAircraftId(@Param('aircraftId') aircraftId) {
        return null;
    }

}