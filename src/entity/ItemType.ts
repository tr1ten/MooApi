import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";

@Entity()
export default class ItemType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    label: string;

    @Column("text",{
        nullable: true
    })
    description: string;

    @Column("text",{
        nullable: true
    })
    image: string;

    @OneToMany(type => Item, item => item.type)
    items: Item[];

    @Column({
        default: "item"
    })
    unit: string;
}