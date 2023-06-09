import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree } from "typeorm";
import { Buyer } from "./Buyer";
import Item from "./Item";
import ItemType from "./ItemType";
import Payment from "./Payment";
import Seller from "./Seller";

export enum SubscriptionStatus {
    PENDING = "pending",
    ACTIVE = "active",
    CANCELLED = "cancelled",
}
@Entity()
export default class Subscription {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(()=> Item,{
        onDelete: "CASCADE"
    })
    item: Item;

    @Column()
    quantity: number;

    
    @ManyToOne(()=> Buyer)
    buyer: Buyer;
    
    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(()=> Payment, payment => payment.subscription)
    payments: Payment[];

    @Column(
        {
            default: SubscriptionStatus.PENDING
        }
    )
    status: SubscriptionStatus;

    @Column(
        { 
            default: 0
        }
    )
    distance: number;
}