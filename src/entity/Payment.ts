import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Subscription from "./Subscription";

@Entity()
export default class Payment{
    @PrimaryColumn()
    id: string;

    @Column()
    amount: number;

    @ManyToOne(()=> Subscription)
    subscription: Subscription;


}