/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { NotificationDto } from "../dto/notification.dto";
import { NotificationEntity } from "../entity/notification.entity";
import { NotificationTemplateEntity } from "../entity/notification.template.entity";
import { NotificationService } from "../service/notification.service";

@Controller({
    version: ['1'],
    path: 'notification'
})
@ApiTags('notification-controller')
@UseInterceptors(ResTransformInterceptor)
export class NotificationController {
    private readonly logger = new Logger(NotificationController.name);
    constructor(private layerService: NotificationService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create notification' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The notification template has been successfully created.'})
    public async create(@Body() data: NotificationDto): Promise<NotificationEntity> {
        return this.layerService.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find all notification template' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.layerService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find notification template by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.layerService.findById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated notification template' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The notification template has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: NotificationDto) {
        return this.layerService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete layer by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<NotificationEntity> {
        return this.layerService.remove(id);
    }

    @Post('paginate')
    @ApiOperation({ summary: 'Find notification template list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<NotificationTemplateEntity>> {
        return this.layerService.paginate(state);
    }
}