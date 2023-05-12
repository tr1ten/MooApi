import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Catalogue from "./Catalogue";
import { User } from "./User";
import { UserType } from "./UserType";

@Entity()
export default class Seller {
    @PrimaryColumn()
    userId: string

    @OneToOne(type => User,{
        cascade: true,
    })
    @JoinColumn()
    user: User;

    @Column("text",{
        nullable: true
    })
    descroption: string;
    

    @OneToOne(type => Catalogue, catalogue => catalogue.seller)
    @JoinColumn()
    catalogue: Catalogue;

    @OneToOne(()=>UserType)
    @JoinColumn()
    type: UserType;
}
