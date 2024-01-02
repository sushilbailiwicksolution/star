import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { EventDetailDto } from "../dto/event.detail.dto";
import { EventDetailsEntity } from "../entity/event.details.entity";
import { LandmarkEntity } from "../entity/landmark.entity";
import { EventDetailService } from "../service/event.detail.service";


/**
 * Handles Event API request
 */
@Controller({
    version: ['1'],
    path: 'event-details'
})
@ApiTags('event-details-controller')


export class EventDetailController {
    private readonly logger = new Logger(EventDetailController.name);

    /**
     * Constructor for aplservice 
     * @param aplService 
     */
    constructor(private aplService: EventDetailService) { }

    /**
     * Create new event 
     * @param data 
     * @returns 
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(EventDetailDto))
    @ApiOperation({ summary: 'Create event detail' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The event detail has been successfully created.'})
    public async create(@Body() data: EventDetailDto): Promise<EventDetailDto> {
        const d = await this.aplService.create(data);
        this.logger.log(`data: ${JSON.stringify(d)}`);
        return this.aplService.create(data);
    }

    /**
     * Find all the event details 
     * @returns 
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(EventDetailDto))
    @ApiOperation({ summary: 'Fin all event detail' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.aplService.findAll();
    }

    /**
     * Find event detail by id 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(EventDetailDto))
    @ApiOperation({ summary: 'Find event detail by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.aplService.findById(id);
    }

    /**
     * Updates event detail
     * @param id 
     * @param data 
     * @returns 
     */
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(EventDetailDto))
    @ApiOperation({ summary: 'Updated event detail' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The event detail has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: EventDetailDto) {
        return this.aplService.update(id, data);
    }

    /**
     * Delete event by id 
     * @param id 
     * @returns 
     */

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(EventDetailDto))
    @ApiOperation({ summary: 'Delete event detail by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<EventDetailDto> {
        return this.aplService.remove(id);
    }

    /**
     * Find event detail list by pagination
     * @param state 
     * @returns 
     */
    @Post('paginate')
    @ApiOperation({ summary: 'Find event detail list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<EventDetailsEntity>> {
        return this.aplService.paginate(state);
    }
}