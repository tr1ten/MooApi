// USer entity

import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { UserType } from "./UserType";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    
    @Column()
    photoUrl: string;

    @Column()
    location: string;

    @OneToOne(()=>UserType)
    type: UserType;

}