import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string
}