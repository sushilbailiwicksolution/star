/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { LandmarkCreateDto } from "../dto/landmark.create.dto";
import { LandmarkService } from "../service/landmark.service";
import { LandmarkEntity } from "../entity/landmark.entity";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";


/**
 * handles request related to landmarks
 */
@Controller({
    version: ['1'],
    path: 'landmarks'
})
@ApiTags('landmarks')
@UseInterceptors(ResTransformInterceptor)


export class LandmarkController {
    private readonly logger = new Logger(LandmarkController.name);
    /**
     * Constructor for landmark controller 
     * @param landmarkService 
     */
    constructor(private landmarkService: LandmarkService) { }

    /**
     * handles landmark creation
     * @param data 
     * @returns 
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create Landmark' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The landmark has been successfully created.'})
    public async create(@Body() data: LandmarkCreateDto): Promise<LandmarkCreateDto> {
        return this.landmarkService.create(data);
    }

    /**
     * Find all the landmark 
     * @returns 
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fin all landmark' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.landmarkService.findAll();
    }

    /**
     * Find a landmark by id provided
     * @param id 
     * @returns 
     */
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find landmark by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.landmarkService.findById(id);
    }

    /**
     * Updates a landmark with new data based on id
     * @param id 
     * @param data 
     * @returns 
     */

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated Landmark' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The landmark has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: LandmarkCreateDto) {
        return this.landmarkService.update(id, data);
    }

    /**
     * Delete a landmark
     * @param id 
     * @returns 
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete landmark by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<LandmarkCreateDto> {
        return this.landmarkService.remove(id);
    }

    /**
     * Find landmark list by pagination
     * @param state 
     * @returns 
     */
    @Post('paginate')
    @ApiOperation({ summary: 'Find landmark list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LandmarkEntity>> {
        return this.landmarkService.paginate(state);
    }
}