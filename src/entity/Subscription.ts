import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    
    @OneToOne(()=>Item)
    @JoinColumn()
    item: Item;

    @Column()
    quantity: number;

    
    @ManyToOne(()=> Buyer)
    @JoinColumn()
    buyer: Buyer;
    
    @CreateDateColumn(
        {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP(6)",
        }
    )
    createdAt: Date;

    @OneToMany(()=> Payment, payment => payment.subscription)
    payments: Payment[];

    @Column(
        {
            default: SubscriptionStatus.PENDING
        }
    )
    status: SubscriptionStatus;
}