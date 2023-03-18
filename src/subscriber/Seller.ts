// this subscribes to Seller crud action and add new cart on insert

import {
    Entity,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from "typeorm";
import Catalogue from "../entity/Catalogue";
  import Seller from "../entity/Seller";
  
  @EventSubscriber()
  export class SellerSubscriber implements EntitySubscriberInterface<Seller> {
    /**
     * Indicates that this subscriber only listen to Seller events.
     */
    listenTo() {
      return Seller;
    }
    async beforeInsert(event: InsertEvent<Seller>): Promise<any> {
      const cat:Catalogue = new Catalogue;
      await event.manager.getRepository(Catalogue).save(cat);
      event.entity.catalogue =  cat;
    }
  }
  