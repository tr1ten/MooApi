import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";
import { Buyer } from "./Buyer";

@Entity()
export default class Rating {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: 0,
  })
  rating: number;
  @ManyToOne(() => Item, (item) => item.ratings)
  item: Item;
  @ManyToOne(() => Buyer)
  buyer: Buyer;
}
