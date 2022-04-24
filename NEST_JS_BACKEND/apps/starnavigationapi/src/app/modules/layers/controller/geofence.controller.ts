/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { GeofenceDto } from "../dto/geofence.dto";
import { GeofenceEntity } from "../entity/geofence.entity";
import { GeofenceService } from "../service/geofence.service";

@Controller({
    version: ['1'],
    path: 'geofence'
})
@ApiTags('geofence-controller')
@UseInterceptors(ResTransformInterceptor)
export class GeofenceController {
    private readonly logger = new Logger(GeofenceController.name);
    constructor(private geofenceService: GeofenceService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create geofence' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The geofence has been successfully created.'})
    public async create(@Body() data: GeofenceDto): Promise<GeofenceEntity> {
        return this.geofenceService.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find all geofence' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.geofenceService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find geofence template by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.geofenceService.findById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated geofence template' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The geofence has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: GeofenceDto) {
        return this.geofenceService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete geofence by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<GeofenceEntity> {
        return this.geofenceService.remove(id);
    }

    @Post('paginate')
    @ApiOperation({ summary: 'Find notification template list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<GeofenceEntity>> {
        return this.geofenceService.paginate(state);
    }
}