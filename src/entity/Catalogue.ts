import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";
import Seller from "./Seller";

@Entity()
export default class Catalogue {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Item, item => item.catalogue)
    items: Item[];

    @OneToOne(type => Seller)
    seller: Seller;

}