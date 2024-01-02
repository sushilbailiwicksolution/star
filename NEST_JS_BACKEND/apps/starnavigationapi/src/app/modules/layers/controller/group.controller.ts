import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { GroupDto } from "../dto/group.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { GroupService } from "../service/group.service";


/**
 * Handles api request related to group
 */
@Controller({
    version: ['1'],
    path: 'groups'
})
@ApiTags('groups')


export class GroupController {
    private readonly logger = new Logger(GroupController.name);
    /**
     * Constructor for group controller
     * @param groupService 
     */
    constructor(private groupService: GroupService) { }

    /**
     * Create a group
     * @param data 
     * @returns 
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(GroupDto))
    @ApiOperation({ summary: 'Create Group' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The group has been successfully created.'})
    public async create(@Body() data: GroupDto): Promise<GroupDto> {
        return this.groupService.create(data);
    }

    /**
     * Find all the group
     * @returns 
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(GroupDto))
    @ApiOperation({ summary: 'Find all group' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.groupService.findAll();
    }

    /**
     * Find a group by id 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(GroupDto))
    @ApiOperation({ summary: 'Find group by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.groupService.findById(id);
    }

    /**
     * Update a group with new data based on id 
     * @param id 
     * @param data 
     * @returns 
     */
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(GroupDto))
    @ApiOperation({ summary: 'Updated group' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The group has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: GroupDto) {
        return this.groupService.update(id, data);
    }

    /**
     * Delete a group based on id
     * @param id 
     * @returns 
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(GroupDto))
    @ApiOperation({ summary: 'Delete group by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<GroupDto> {
        return this.groupService.remove(id);
    }

    /**
     * Find group list by pagination 
     * @param state 
     * @returns 
     */
    @Post('paginate')
    @ApiOperation({ summary: 'Find group list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LandmarkEntity>> {
        return this.groupService.paginate(state);
    }
}