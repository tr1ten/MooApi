import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Catalogue from "./Catalogue";
import ItemType from "./ItemType";

@Entity()
export default class Item {
    @PrimaryColumn()
    id: string;

    @OneToOne(type => ItemType)
    type: ItemType;

    @Column()
    capacity: number;

    @ManyToOne(type => Catalogue, catalogue => catalogue.items)
    catalogue: Catalogue;

}