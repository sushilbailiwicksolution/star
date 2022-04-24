import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { AplDto } from "../dto/apl.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { AplService } from "../service/apl.service";

@Controller({
    version: ['1'],
    path: 'assets/apl'
})
@ApiTags('apl-controller')
export class AplController {
    private readonly logger = new Logger(AplController.name);
    constructor(private aplService: AplService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(AplDto))
    @ApiOperation({ summary: 'Create Apl' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The apl has been successfully created.'})
    public async create(@Body() data: AplDto): Promise<AplDto> {
        const d = await this.aplService.create(data);
        this.logger.log(`data: ${JSON.stringify(d)}`);
        return this.aplService.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(AplDto))
    @ApiOperation({ summary: 'Fin all apl' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.aplService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(AplDto))
    @ApiOperation({ summary: 'Find apl by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.aplService.findById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(AplDto))
    @ApiOperation({ summary: 'Updated apl' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The apl has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: AplDto) {
        return this.aplService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(AplDto))
    @ApiOperation({ summary: 'Delete apl by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<AplDto> {
        return this.aplService.remove(id);
    }

    @Post('paginate')
    @ApiOperation({ summary: 'Find apl list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LandmarkEntity>> {
        return this.aplService.paginate(state);
    }
}