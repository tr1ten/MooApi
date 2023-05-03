// this subscribes to User crud action and add new cart on insert

import {
    Entity,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from "typeorm";
import Seller from "../entity/Seller";
import {User} from "../entity/User";
import { Buyer } from "../entity/Buyer";
  
  @EventSubscriber()
  export class UserSubscriber implements EntitySubscriberInterface<User> {
    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
      return User;
    }
    async afterInsert(event: InsertEvent<User>): Promise<any> {
      if(parseInt(event.entity.type as any)=== 1){
        const seller:Seller = new Seller();
        seller.userId = event.entity.id;
        seller.user = event.entity;
        // console.log("seller ",seller);
        await event.manager.getRepository(Seller).save(seller);
      }
      else {
        const buyer:Buyer = new Buyer();
        buyer.userId = event.entity.id;
        buyer.user = event.entity;
        // console.log("buyer ",buyer);
        await event.manager.getRepository(Buyer).save(buyer);
      }
    }
  }
  