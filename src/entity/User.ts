// USer entity

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { UserType } from "./UserType";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    @Column({
        nullable:true
    })
    location: string;
    @ManyToOne(()=>UserType , userType => userType.users,{
         cascade: true,
    })
    type: UserType;

}