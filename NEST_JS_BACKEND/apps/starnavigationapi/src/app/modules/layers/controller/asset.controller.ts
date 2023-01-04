import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { AssetDto } from "../dto/asset.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { AssetService } from "../service/asset.service";


/**
 * Handles api request related to asset 
 */
@Controller({
    version: ['1'],
    path: 'assets'
})
@ApiTags('assets')
@UseInterceptors(ResTransformInterceptor)


export class AssetController {
    private readonly logger = new Logger(AssetController.name);
    /**
     * Constructor for asset controller 
     * @param assetService 
     */
    constructor(private assetService: AssetService) { }

    /**
     * Creates new asset
     * @param data 
     * @returns 
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create Asset' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The asset has been successfully created.'})
    public async create(@Body() data: AssetDto): Promise<AssetDto> {
        return this.assetService.create(data);
    }

    /**
     * Find all the assets in database
     * @returns 
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fin all asset' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.assetService.findAll();
    }

    // Find asset for logged in user 

    // @Get(':id')
    // @HttpCode(HttpStatus.OK)
    // @ApiOperation({ summary: 'Find asset for logged User' })
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
    // public async findUserAsset(@Param() id:number):Promise<AssetDto> {
    //     return this.assetService.findUserAsset(id);
    // }


/**
 * Find asset based on customer id 
 * @param id 
 * @returns 
 */
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find asset by customerId' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAssetOfUser(@Param('id') id:number) {
        return this.assetService.findUserAsset(id);
    }

    /**
     * Updates existing asset with new data 
     * @param data 
     * @returns 
     */
    @Put()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated asset' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The asset has been successfully updated.'})
    public async update(@Body() data: AssetDto) {
        return this.assetService.update(data);
    }

    /**
     * Deletes asset based on id 
     * @param id 
     * @returns 
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete asset by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<AssetDto> {
        return this.assetService.remove(id);
    }

    /**
     * Find asset list by pagination 
     * @param state 
     * @returns 
     */
    @Post('paginate')
    @ApiOperation({ summary: 'Find asset list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LandmarkEntity>> {
        return this.assetService.paginate(state);
    }
}