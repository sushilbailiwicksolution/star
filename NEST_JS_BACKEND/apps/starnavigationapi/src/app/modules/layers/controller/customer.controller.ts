import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { CustomerDto } from "../dto/customer.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { CustomerService } from "../service/customer.service";

@Controller({
    version: ['1'],
    path: 'customers'
})
@ApiTags('customer-controller')
@UseInterceptors(ResTransformInterceptor)
export class CustomerController {
    private readonly logger = new Logger(CustomerController.name);
    constructor(private customerService: CustomerService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new TransformInterceptor(CustomerDto))
    @ApiOperation({ summary: 'Create Customer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The customer has been successfully created.'})
    public async create(@Body() data: CustomerDto): Promise<CustomerDto> {
        return this.customerService.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find all customer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find customer by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.customerService.findById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated customer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The customer has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: CustomerDto) {
        return this.customerService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete customer by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<CustomerDto> {
        return this.customerService.remove(id);
    }

    @Post('paginate')
    @ApiOperation({ summary: 'Find customer list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LandmarkEntity>> {
        return this.customerService.paginate(state);
    }
}