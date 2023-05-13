import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Catalogue from "./Catalogue";
import ItemType from "./ItemType";
import Rating from "./Rating";

@Entity()
export default class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ItemType, itemType => itemType.items)
    type: ItemType;

    @Column()
    capacity: number;

    @Column({
        default: 0
    })
    price: number;

    @ManyToOne(type => Catalogue, catalogue => catalogue.items)
    catalogue: Catalogue;

    @OneToMany(type => Rating, rating => rating.item)
    ratings: Rating[];
    

}