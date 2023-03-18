// this subscribes to User crud action and add new cart on insert

import {
    Entity,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from "typeorm";
import Seller from "../entity/Seller";
import {User} from "../entity/User";
  
  @EventSubscriber()
  export class UserSubscriber implements EntitySubscriberInterface<User> {
    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
      return User;
    }
    async afterInsert(event: InsertEvent<User>): Promise<any> {
      const seller:Seller = new Seller();
      seller.userId = event.entity.id;
      seller.user = event.entity;
      await event.manager.getRepository(Seller).save(seller);
    }
  }
  