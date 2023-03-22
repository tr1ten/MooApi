import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Subscription from "./Subscription";
import { UserType } from "./UserType";

@Entity()
export class Buyer {
    @PrimaryColumn()
    userId: string;

    @OneToOne(()=>UserType)
    @JoinColumn()
    type: UserType;

    @OneToMany(type => Subscription, subscription => subscription.buyer)
    subscriptions: Subscription[];


}