import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { CustomerDto, NewCustomerDto } from "../dto/customer.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { CustomerService } from "../service/customer.service";
// import { NewCustomerEntity } from "../entity/customer.entity";


/**
 * Handles api requests related to customers 
 */


@Controller({
    version: ['1'],
    path: 'customers'
  })
  @ApiTags('customer-controller')
  @UseInterceptors(ResTransformInterceptor)
  export class CustomerController {
    private readonly logger = new Logger(CustomerController.name);
  
    constructor(private customerService: CustomerService) {}
  
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
    @ApiOperation({ summary: 'Find a customer by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The customer has been successfully retrieved.'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.'})
    public async findOne(@Param('id') id: number) {
      return this.customerService.findOne(id);
    }

    @Get('user/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find a customer user by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The customer has been successfully retrieved.'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.'})
    public async findCustomerUser(@Param('id') id: number) {
      return this.customerService.findCustomerUser(id);
    }
  
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a customer by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The customer has been successfully updated.'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.'})
    public async update(@Param('id') id: number, @Body() data: CustomerDto) {
      return this.customerService.update(id, data);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a customer by ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The customer has been successfully deleted.'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.'})
    public async delete(@Param('id') id: number) {
      await this.customerService.delete(id);
    }
  }
  