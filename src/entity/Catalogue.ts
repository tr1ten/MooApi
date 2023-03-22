import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";
import Seller from "./Seller";

@Entity()
export default class Catalogue {
    @PrimaryGeneratedColumn()
    id: number;

    
    @OneToMany(type => Item, item => item.catalogue,{
        lazy:false
    })
    items: Item[];

    @OneToOne(type => Seller, seller => seller.catalogue,{
        cascade: true,
    })
    seller: Seller;

}