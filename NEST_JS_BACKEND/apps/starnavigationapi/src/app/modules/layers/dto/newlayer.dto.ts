import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

/**
 * This is NewLayerCreate class
 * 
 * Describes all the fields of new layer for API 
 * 
 * @ignore
 */

export class ProductDataDto {
    @ApiProperty({ description: 'Id of the product data' })
    product_id: string;
  
    @ApiProperty({ description: 'Name of the product data' })
    product_name: string;
  }
  

export class LayerDataDto {
  @ApiProperty({ description: 'Id of the layer data' })
  id: number;

  @ApiProperty({ description: 'Value of the layer data' })
  value: string;

  @ValidateNested({each:true})
  @ApiProperty({
    type: ProductDataDto,
    isArray: true,
    description: 'Array of product data',
  })
  data?: ProductDataDto[];
  
}



//For new service
// export class LayerDataDto {
//   @ApiProperty({ description: 'Id of the layer data' })
//   id: number;

//   @ApiProperty({ description: 'Value of the layer data' })
//   value: string;

//   @ApiProperty({
//     type: ProductDataDto,
//     isArray: true,
//     description: 'Array of product data',
//   })
//   data?: never;
  
//   @ApiProperty({
//     type: ProductDataDto,
//     isArray: false,
//     description: 'Product data',
//   })
//   productData?: ProductDataDto;
// }



export class NLayerDto {
  @ApiProperty({ description: 'Id of the layer' })
  id: number;

  @ApiProperty({ description: 'Category of the layer' })
  category: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Flag indicating if the layer has a subcategory',
  })
  has_subcategory: boolean;

  @ApiProperty({
    type: LayerDataDto,
    isArray: true,
    description: 'Array of layer data',
  })
  data: LayerDataDto[];
}



//For new service
// export class NLayerDto {
//   @ApiProperty({ description: 'Id of the layer' })
//   id: number;

//   @ApiProperty({ description: 'Category of the layer' })
//   category: string;

//   @ApiProperty({
//     type: 'boolean',
//     description: 'Flag indicating if the layer has a subcategory',
//   })
//   has_subcategory: boolean;

//   @ApiProperty({
//     type: LayerDataDto,
//     isArray: true,
//     description: 'Array of layer data',
//   })
//   data: LayerDataDto[] | ProductDataDto[];
// }
