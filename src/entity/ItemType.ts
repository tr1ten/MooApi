import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    
}