import { Column, Entity } from "typeorm";
import { ExtendEntity } from "./extend.entity";

@Entity({name: "sample"})
export class SampleEntity extends ExtendEntity {
    @Column({length: 100, nullable: false})
    name?: string;
    email?: string
}