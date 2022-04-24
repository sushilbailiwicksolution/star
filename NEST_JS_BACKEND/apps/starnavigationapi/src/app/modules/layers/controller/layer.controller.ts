/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { LayerCreateDto } from "../dto/layer.create.dto";
import { LayerEntity } from "../entity/layer.entity";
import { LayerService } from "../service/layer.service";

@Controller({
    version: ['1'],
    path: 'layers'
})
@ApiTags('layers')
@UseInterceptors(ResTransformInterceptor)
export class LayerController {
    private readonly logger = new Logger(LayerController.name);
    constructor(private layerService: LayerService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create Layer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The layer has been successfully created.'})
    public async create(@Body() data: LayerCreateDto): Promise<LayerCreateDto> {
        return this.layerService.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fin all layers' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.layerService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find layer by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.layerService.findById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated Layer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The layer has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: LayerCreateDto) {
        return this.layerService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete layer by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<LayerCreateDto> {
        return this.layerService.remove(id);
    }

    @Post('paginate')
    @ApiOperation({ summary: 'Find layer list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LayerEntity>> {
        return this.layerService.paginate(state);
    }
}