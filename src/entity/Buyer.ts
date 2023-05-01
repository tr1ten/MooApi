import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Subscription from "./Subscription";
import { UserType } from "./UserType";
import { User } from "./User";

@Entity()
export class Buyer {
    @PrimaryColumn()
    userId: string;

    @OneToOne(type => User,{
        cascade: true,
    })
    @JoinColumn()
    user: User;

    @OneToOne(()=>UserType)
    @JoinColumn()
    type: UserType;

    @OneToMany(type => Subscription, subscription => subscription.buyer)
    subscriptions: Subscription[];


}