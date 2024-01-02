import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import * as https from 'https';
import axios, { AxiosRequestConfig } from 'axios';
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { AssetDto } from "../dto/asset.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { AssetService } from "../service/asset.service";

interface NodeApiAssetData {
    asset_id: string;
    aircraftid: string;
    start_event_time: string;
    stop_event_time: string;
    current_status: 'IN-AIR' | 'ON-GROUND';
    gps_lat: string;
    gps_long: string;
    speed: string;
    heading: string;
    altitude: string;
    date_time: string;
    initial_gps_lat: string;
    initial_gps_long: string;
    elapsed_time: {
      days: number;
      hours: number;
      minutes: number;
    };
    location: string;
    distance: number;
  }
  



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



    @Get('user-assets/:customerId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find assets by customer ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async findUserAssets(@Param('customerId') customerId: number) {
    return this.assetService.findUserAssets(customerId);
  }

  @Get('customer-assets/:customerId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find assets by customer ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async findCustomerAssets(@Param('customerId') customerId: number) {
    return this.assetService.findCustomerAssets(customerId);
  }

//Adding customerId and customer filter 


// @Get('latestdata')
// @HttpCode(HttpStatus.OK)
// @ApiOperation({ summary: 'Find Latest Data for an Asset' })
// @ApiResponse({ status: 403, description: 'Forbidden' })
// public async findAssetData(
//   @Query('sort') sort?: 'asc' | 'desc',
//   @Query('filter') filter?: 'active' | 'inactive',
//   @Query('search') search?: string,
//   @Query('customerId') customerId?: string, // Add this query parameter
//   @Query('id') id?: string, // Add this query parameter
// ): Promise<NodeApiAssetData[]> {
//   const NODE_API_URL = 'https://star-ads-app.com:3378/getLatestAssetData';
//     //  const NODE_API_URL='http://103.10.234.244:3378/getLatestAssetData';
//   // const NODE_API_URL=`http://localhost:3378/getLatestAssetData`;
//   const nodeResponse = await axios.get(NODE_API_URL);
//   const nodeApiAssetData: NodeApiAssetData[] = nodeResponse.data;
//   let nestAssetData = await this.assetService.findAll();
//   let matchedData = [];

//   if (customerId) { // Check if customerId is provided
//     // Find asset data matching the requested customerId
//     nestAssetData = nestAssetData.filter((asset: any) => asset.customerId.toString() === customerId);
//   } else if (id) {
//     nestAssetData = nestAssetData.filter((asset: any) => asset.customerId.toString() === id);
//   } 


//     for (const nestAsset of nestAssetData) {
//       const matchedNestData = nodeApiAssetData.find((data: any) => data.asset_id === nestAsset.esn);
//       if (matchedNestData) {
//         matchedData.push(Object.assign(nestAsset, matchedNestData));
//       }
//     }

//     if (filter) {
//       matchedData = matchedData.filter((asset: any) => {
//         const elapsedTime = asset.elapsed_time.days * 86400 + asset.elapsed_time.hours * 3600 + asset.elapsed_time.minutes * 60;
//         if (elapsedTime > 14 * 86400) {
//           return filter === 'inactive';
//         } else {
//           return filter === 'active';
//         }
//       });
//     }

//     if (search) {
//       matchedData = matchedData.filter((asset: any) => asset.asset_id === search);
//     }

//     if (sort) {
//       matchedData = matchedData.sort((a: any, b: any) => {
//         const aElapsedTime = a.elapsed_time.days * 86400 + a.elapsed_time.hours * 3600 + a.elapsed_time.minutes * 60;
//         const bElapsedTime = b.elapsed_time.days * 86400 + b.elapsed_time.hours * 3600 + b.elapsed_time.minutes * 60;
//         if (sort === 'asc') {
//           return aElapsedTime - bElapsedTime;
//         } else {
//           return bElapsedTime - aElapsedTime;
//         }
//       });
//     }
  

//   return matchedData;
// }


@Get('latestdata')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Find Latest Data for an Asset' })
@ApiResponse({ status: 403, description: 'Forbidden' })
public async findAssetData(
  @Query('sort') sort?: 'asc' | 'desc',
  @Query('filter') filter?: 'active' | 'inactive',
  @Query('search') search?: string,
  @Query('customerId') customerId?: string, // Add this query parameter
  @Query('id') id?: string, // Add this query parameter
): Promise<NodeApiAssetData[]> {
  try {
    const NODE_API_URL = 'https://star-ads-app.com:3378/getLatestAssetData';
    //  const NODE_API_URL='http://103.10.234.244:3378/getLatestAssetData';
    // const NODE_API_URL=`http://localhost:3378/getLatestAssetData`;

    // const nodeResponse = await axios.get(NODE_API_URL );

    const axiosConfig: AxiosRequestConfig = {
      url: NODE_API_URL,
      method: 'get',
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };

    const nodeResponse = await axios(axiosConfig);
    const nodeApiAssetData: NodeApiAssetData[] = nodeResponse.data;
    let nestAssetData = await this.assetService.findAll();
    let matchedData = [];

    if (customerId) {
      nestAssetData = nestAssetData.filter((asset: any) => asset.customerId.toString() === customerId);
    } else if (id) {
      nestAssetData = nestAssetData.filter((asset: any) => asset.customerId.toString() === id);
    }

    for (const nestAsset of nestAssetData) {
      const matchedNestData = nodeApiAssetData.find((data: any) => data.asset_id === nestAsset.esn);
      if (matchedNestData) {
        matchedData.push(Object.assign(nestAsset, matchedNestData));
      }
    }

    if (filter) {
      matchedData = matchedData.filter((asset: any) => {
        const elapsedTime = asset.elapsed_time.days * 86400 + asset.elapsed_time.hours * 3600 + asset.elapsed_time.minutes * 60;
        if (elapsedTime > 14 * 86400) {
          return filter === 'inactive';
        } else {
          return filter === 'active';
        }
      });
    }

    if (search) {
      matchedData = matchedData.filter((asset: any) => asset.asset_id === search);
    }

    if (sort) {
      matchedData = matchedData.sort((a: any, b: any) => {
        const aElapsedTime = a.elapsed_time.days * 86400 + a.elapsed_time.hours * 3600 + a.elapsed_time.minutes * 60;
        const bElapsedTime = b.elapsed_time.days * 86400 + b.elapsed_time.hours * 3600 + b.elapsed_time.minutes * 60;
        if (sort === 'asc') {
          return aElapsedTime - bElapsedTime;
        } else {
          return bElapsedTime - aElapsedTime;
        }
      });
    }

    return matchedData;
  } catch (error) {
    // Log the error
    console.error('Error occurred while fetching data from the Node API:', error);

    // Return empty values or handle the error gracefully
    throw error;
  }
}




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