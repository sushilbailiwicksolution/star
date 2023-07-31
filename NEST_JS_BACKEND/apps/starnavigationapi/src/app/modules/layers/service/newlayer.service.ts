import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Repository } from "typeorm";
import {  NLayerDto,LayerDataDto,ProductDataDto } from "../dto/newlayer.dto";
import { LayerData, NLayer, ProductData} from "../entity/newlayer.entity";

@Injectable()
export class NewLayerService {
  // constructor(@InjectRepository(NLayer) private layerRepository: Repository<NLayer>) {}
 
  constructor(
    @InjectRepository(NLayer)
    private readonly layerRepository: Repository<NLayer>,
    @InjectRepository(NLayer)
    private productCategoryRepository: Repository<NLayer>,
    @InjectRepository(LayerData)
    private readonly layerDataRepository: Repository<LayerData>,
    @InjectRepository(ProductData)
    private readonly productRepository: Repository<ProductData>,
  ) {}


  //added -1-3-23
  private categories: NLayer[] = [
    {
      id: 1,
      category: 'Aeronotical Charts',
      has_subcategory: false,
      data: [
        {
          id: 1,
          value: 'US High',
          data: [
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
          ],
        },
        {
          id: 2,
          value: 'US Low',
          data: [
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
          ],
        },
        {
          id: 3,
          value: 'US VFR',
          data: [
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      category: 'Weather Subscription Basics',
      has_subcategory: true,
      data: [
        {
          id: 4,
          value: 'Enroute',
          data: [
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            }, {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
          ],
        },
        {
          id: 5,
          value: 'Forecast',
          data: [
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            }, {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
          ],
        },{
          id: 6,
          value: 'Lightining and Hazardus',
          data: [
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
            {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            }, {
              product_id: 'C39-0x0302-0',
              product_name: 'camulas weather',
            },
          ],
        },
      ],
    },
  ];


// Get all layers 
async getLayers(): Promise<NLayerDto[]> { 
    return this.categories.map((category) => this.toCategoryDto(category));
}

private toCategoryDto(category: NLayer): NLayerDto {
  if (category.has_subcategory) {
    return {
      id: category.id,
      category: category.category,
      has_subcategory: category.has_subcategory,
      data: category.data.map((subcategory) => ({
        id: subcategory.id,
        value: subcategory.value,
        product: subcategory.data.map((product) => ({
          product_id: product.product_id,
          product_name: product.product_name,
        })),
      })),
    };
  } else {
    const products = category.data.flatMap((subcategory) =>
      subcategory.data.map((product) => ({
        id: subcategory.id,
        value: subcategory.value,
        product_id: product.product_id,
        product_name: product.product_name,
      })),
    );

    return {
      id: category.id,
      category: category.category,
      has_subcategory: category.has_subcategory,
      data: products,
    };
  }
}

// to handle create request 
async createLayer(layerDTO: NLayerDto): Promise<NLayerDto> {
  const layer = new NLayer();
  layer.category = layerDTO.category;
  layer.has_subcategory = layerDTO.has_subcategory;
  await this.layerRepository.save(layer);

  layerDTO.data.forEach(async layerDataDTO => {
    const layerData = new LayerData();
    layerData.value = layerDataDTO.value;
    layerData.layer = layer;
    await this.layerDataRepository.save(layerData);

    if (layerDataDTO.data) {
      layerDataDTO.data.forEach(async productDTO => {
        const product = new ProductData();
        product.product_id = productDTO.product_id;
        product.product_name = productDTO.product_name;
        product.layerData = layerData;
        await this.productRepository.save(product);
      });
    }
  });

  return layerDTO;
}

//Update Layer 
async updateLayer(layerId: number, layerDTO: NLayerDto): Promise<NLayerDto> {
  const layer = await this.layerRepository.findOne(layerId);
  layer.category = layerDTO.category;
  layer.has_subcategory = layerDTO.has_subcategory;
  await this.layerRepository.save(layer);

  for (const layerDataDTO of layerDTO.data) {
    const layerData = await this.layerDataRepository.findOne(layerDataDTO.id);
    if (!layerData) {
      continue;
    }
    layerData.value = layerDataDTO.value;
    layerData.layer = layer;
    await this.layerDataRepository.save(layerData);

    if (layerDataDTO.data) {
      for (const productDTO of layerDataDTO.data) {
        const product = await this.productRepository.findOne(productDTO.product_id);
        if (!product) {
          continue;
        }
        product.product_id = productDTO.product_id;
        product.product_name = productDTO.product_name;
        product.layerData = layerData;
        await this.productRepository.save(product);
      }
    }
  }

  return layerDTO;
}

async deleteLayer(layerId: number): Promise<void> {
  const layer = await this.layerRepository.findOne(layerId);
  if (!layer) {
    throw new NotFoundException(`Layer with id ${layerId} not found`);
  }
  await this.layerRepository.remove(layer);
}

}



//Layer Data Code Latest

// @Injectable()
// export class NewLayerService {
//   constructor(
//     @InjectRepository(NLayer)
//     private readonly nLayerRepository: Repository<NLayer>,
//     @InjectRepository(LayerData)
//     private readonly layerDataRepository: Repository<LayerData>,
//     @InjectRepository(ProductData)
//     private readonly productDataRepository: Repository<ProductData>,
//   ) {}
  
//   // async getLayers(): Promise<NLayerDto[]> {
//   //   const nLayers = await this.nLayerRepository.find({ relations: ['data', 'data.data'] });
//   //   return nLayers.map(nLayer => this.mapNLayerToDto(nLayer));
//   // }

//   async  getLayers(): Promise<NLayerDto[]> {
//     const layers = await this.nLayerRepository.find({ relations: ['data', 'data.data'] });
//     return layers.map(layer => {
//       if (layer.has_subcategory) {
//         return plainToClass(NLayerDto, layer, { excludeExtraneousValues: true });
//       } else {
//         const data = layer.data.reduce((acc, curr) => {
//           const productData = curr.data.map(pd => plainToClass(ProductDataDto, pd, { excludeExtraneousValues: true }));
//           const layerDataDto = plainToClass(LayerDataDto, { ...curr, productData }, { excludeExtraneousValues: true });
//           return [...acc, layerDataDto];
//         }, []);
//         const { id, category, has_subcategory } = layer;
//         return plainToClass(NLayerDto, { id, category, has_subcategory, data }, { excludeExtraneousValues: true });
//       }
//     });
//   }
  


//   // async createNLayer(nLayerDto: NLayerDto): Promise<NLayerDto> {
//   //   const nLayer = this.mapDtoToNLayer(nLayerDto);
//   //   const savedNLayer = await this.nLayerRepository.save(nLayer);
//   //   return this.mapNLayerToDto(savedNLayer);
//   // }

//   // private mapNLayerToDto(nLayer: NLayer): NLayerDto {
//   //   const { id, category, has_subcategory, data } = nLayer;
//   //   const layerDataDto = data.map(layerData => this.mapLayerDataToDto(layerData));
//   //   return { id, category, has_subcategory, data: layerDataDto };
//   // }

//   // private mapLayerDataToDto(layerData: LayerData): LayerDataDto {
//   //   const { id, value, data } = layerData;
//   //   const productDataDto = data.map(productData => this.mapProductDataToDto(productData));
//   //   return { id, value, productData: productDataDto };
//   // }

//   // private mapProductDataToDto(productData: ProductData): ProductDataDto {
//   //   const { product_id, product_name } = productData;
//   //   return { product_id, product_name };
//   // }

//   // private mapDtoToNLayer(nLayerDto: NLayerDto): NLayer {
//   //   const { category, has_subcategory, data } = nLayerDto;
//   //   const layerData = data.map(layerDataDto => this.mapDtoToLayerData(layerDataDto));
//   //   const nLayer = new NLayer();
//   //   nLayer.category = category;
//   //   nLayer.has_subcategory = has_subcategory;
//   //   nLayer.data = layerData;
//   //   return nLayer;
//   // }

//   // private mapDtoToLayerData(layerDataDto: LayerDataDto): LayerData {
//   //   const { value, data } = layerDataDto;
//   //   const productData = data.map(productDataDto => this.mapDtoToProductData(productDataDto));
//   //   const layerData = new LayerData();
//   //   layerData.value = value;
//   //   layerData.data = productData;
//   //   return layerData;
//   // }

//   // private mapDtoToProductData(productDataDto: ProductDataDto): ProductData {
//   //   const { product_id, product_name } = productDataDto;
//   //   const productData = new ProductData();
//   //   productData.product_id = product_id;
//   //   productData.product_name = product_name;
//   //   return productData;
//   // }
// }



