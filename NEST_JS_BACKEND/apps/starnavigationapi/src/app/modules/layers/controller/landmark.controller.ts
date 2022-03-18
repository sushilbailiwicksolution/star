/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { LandmarkCreateDto } from "../dto/landmark.create.dto";
import { LayerEntity } from "../entity/layer.entity";
import { LandmarkService } from "../service/landmark.service";

@Controller({
    version: ['1'],
    path: 'landmarks'
})
@ApiTags('landmarks')
export class LandmarkController {
    private readonly logger = new Logger(LandmarkController.name);
    constructor(private landmarkService: LandmarkService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(LandmarkCreateDto))
    @ApiOperation({ summary: 'Create Landmark' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The landmark has been successfully created.'})
    public async create(@Body() data: LandmarkCreateDto): Promise<LandmarkCreateDto> {
        const d = await this.landmarkService.create(data);
        this.logger.log(`data: ${JSON.stringify(d)}`);
        return this.landmarkService.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(LandmarkCreateDto))
    @ApiOperation({ summary: 'Fin all landmark' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.landmarkService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(LandmarkCreateDto))
    @ApiOperation({ summary: 'Find landmark by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.landmarkService.findById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(LandmarkCreateDto))
    @ApiOperation({ summary: 'Updated Landmark' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The landmark has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: LandmarkCreateDto) {
        return this.landmarkService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(LandmarkCreateDto))
    @ApiOperation({ summary: 'Delete landmark by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<LandmarkCreateDto> {
        return this.landmarkService.remove(id);
    }

    @Post('paginate')
    @ApiOperation({ summary: 'Find landmark list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LayerEntity>> {
        return this.landmarkService.paginate(state);
    }
}