import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import Catalogue from "./Catalogue";
import { User } from "./User";

@Entity()
export default class Seller {
    @PrimaryColumn()
    @OneToOne(type => User)
    id: string;

    @Column("text")
    descroption: string;


    @OneToOne(type => Catalogue)
    catalogue: Catalogue;
}
