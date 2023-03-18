import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Item from "./Item";

@Entity()
export default class Catalogue {
    @PrimaryColumn()
    id: string;

    @OneToMany(type => Item, item => item.catalogue)
    items: Item[];

}