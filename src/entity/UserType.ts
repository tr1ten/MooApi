import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string


    @OneToMany(type => User, user => user.type)
    users: User[]
}