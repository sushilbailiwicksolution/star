/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, NotFoundException, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { NewLayerService } from "../service/newlayer.service";
import { NLayerDto } from "../dto/newlayer.dto";


/**
 * handles request related to NewLayers
 */
@Controller({
    version: ['1'],
    path: 'newlayer'
})
@ApiTags('newlayer')
@UseInterceptors(ResTransformInterceptor)


export class NewLayerController {
    private readonly logger = new Logger(NewLayerController.name);
    /**
     * Constructor for NewLayer controller 
     * @param newlayer 
     */
    constructor(private newlayer: NewLayerService) { }
    // constructor(private  productCategoryService:NewLayerService ) {}
  

  //   /**
  //    * handles NewLayer creation
  //    * @param data 
  //    * @returns 
  //    */
   
  @Post()
  @ApiOperation({ summary: 'Create a new layer' })
  @ApiResponse({
    status: 201,
    description: 'The layer has been successfully created.',
    type: NLayerDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() layerDto: NLayerDto) {
    return this.newlayer.createLayer(layerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all layers' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of layers', type: NLayerDto, isArray: true })
  async getLayers(): Promise<NLayerDto[]> {
    return this.newlayer.getLayers();
  }


  @Put(':id')
  async updateLayer(
    @Param('id') layerId: number,
    @Body() layerDTO: NLayerDto,
  ): Promise<NLayerDto> {
    const updatedLayer = await this.newlayer.updateLayer(layerId, layerDTO);
    if (!updatedLayer) {
      throw new NotFoundException(`Layer with id ${layerId} not found`);
    }
    return updatedLayer;
  }

  @Delete(':id')
  async deleteLayer(@Param('id') layerId: number): Promise<void> {
    await this.newlayer.deleteLayer(layerId);
  }




  //22 feb controller 
 
    // @Post()
    // create(@Body() productCategoryDTO: NLayerDto) {
    //   return this.productCategoryService.create(productCategoryDTO);
    // }
  
    // @Get()
    // findAll() {
    //   return this.productCategoryService.findAll();
    // }
  
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.productCategoryService.findOne(+id);
    // }
  
    // @Put(':id')
    // update(@Param('id') id: string, @Body() productCategoryDTO: NLayerDto) {
    //   return this.productCategoryService.update(+id, productCategoryDTO);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.productCategoryService.remove(+id);
    // }
  }
  
  

