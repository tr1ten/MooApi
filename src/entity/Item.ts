import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Catalogue from "./Catalogue";
import ItemType from "./ItemType";

@Entity()
export default class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ItemType, itemType => itemType.items)
    type: ItemType;

    @Column()
    capacity: number;

    @ManyToOne(type => Catalogue, catalogue => catalogue.items)
    catalogue: Catalogue;

}