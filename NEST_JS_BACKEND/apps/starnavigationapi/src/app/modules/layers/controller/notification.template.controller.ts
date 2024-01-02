/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { NotificationTemplateDto } from "../dto/notification.template.dto";
import { NotificationTemplateEntity } from "../entity/notification.template.entity";
import { NotificationTemplateService } from "../service/notification.template.service";
/**
 * This handles API requests related to NotificationTemplateController.
 */
@Controller({
    version: ['1'],
    path: 'notification-template'
})
@ApiTags('notification-template-controller')
@UseInterceptors(ResTransformInterceptor)

export class NotificationTemplateController {
    private readonly logger = new Logger(NotificationTemplateController.name);
    /**
     * Constructor for notification template controller 
     * @param layerService 
     */
    constructor(private layerService: NotificationTemplateService) { }

    /**
     * Create notification template
     * @param data 
     * @returns 
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create notification template' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The notification template has been successfully created.'})
    public async create(@Body() data: NotificationTemplateDto): Promise<NotificationTemplateDto> {
        return this.layerService.create(data);
    }

    /**
     * Find all the notification template
     * @returns 
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fin all notification template' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.layerService.findAll();
    }

    /**
     * Find notification based on template id 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find notification template by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.layerService.findById(id);
    }

    /**
     * Updated notification template
     * @param id 
     * @param data 
     * @returns 
     */
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated notification template' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The notification template has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: NotificationTemplateDto) {
        return this.layerService.update(id, data);
    }

    /**
     * Delete Notification by id
     * @param id 
     * @returns 
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete notification by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<NotificationTemplateDto> {
        return this.layerService.remove(id);
    }

    /**
     * Find notification template list by pagination
     * @param state 
     * @returns 
     */
    @Post('paginate')
    @ApiOperation({ summary: 'Find notification template list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<NotificationTemplateEntity>> {
        return this.layerService.paginate(state);
    }
}