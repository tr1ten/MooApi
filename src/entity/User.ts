// USer entity

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { UserType } from "./UserType";
import { pseudoRandomBytes } from "crypto";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    @Column({
        default: "Kurukshetra"
    })
    location: string;
    @ManyToOne(()=>UserType , userType => userType.users,{
         cascade: true,
    })
    type: UserType;

    @Column()
    name: string= pseudoRandomBytes(4).toString("hex");
    
    @Column(
        {
            default: "https://source.unsplash.com/random/?person&1"
        }
    )
    image: string;
}