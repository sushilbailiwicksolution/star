import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';


@Entity({name:"layer_category"})
export class NLayer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  has_subcategory: boolean;

  @OneToMany(
    type => LayerData,
    layerData => layerData.layer,
    { cascade: true },
  )
  data: LayerData[];
}

@Entity({name:"layer_data"})
export class LayerData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value?: string;
  
  @OneToMany(
    type => ProductData,
    productData => productData.layerData,
    { cascade: true },
  )
  data?: ProductData[];


  
  @ManyToOne(
    type => NLayer,
    layer => layer.data,
    { onDelete: 'CASCADE' },
  )
  layer?: NLayer;

}

@Entity({name:"product_data"})
export class ProductData {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  product_id: string;

  @Column()
  product_name: string;

  @ManyToOne(
    type => LayerData,
    layerData => layerData.data,
    { onDelete: 'CASCADE' },
  )
  layerData?: LayerData;
}
