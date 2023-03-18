// USer entity

import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserType } from "./UserType";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    
    @Column({
        nullable:true
    })
    photoUrl: string;

    @Column({
        nullable:true
    })
    location: string;

    @OneToOne(()=>UserType)
    @JoinColumn()
    type: UserType;

}