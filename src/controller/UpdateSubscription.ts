// this update the subscription of the user

import { Request, Response } from "express";
import { User } from "../entity/User";
import { UserType } from "../entity/UserType";
import { $Request } from "../type";
import Subscription, { SubscriptionStatus } from "../entity/Subscription";
import { ApiError } from "../error";
import Item from "../entity/Item";

export async function UpdateSubscription(req: $Request, res: Response) {
  const { orm } = req.locals;
  const { id, status } = req.body;
  console.log("reachivend for subscription ", id, status);
  if (
    !id ||
    !status ||
    (status !== SubscriptionStatus.ACTIVE &&
      status !== SubscriptionStatus.CANCELLED &&
        status !== SubscriptionStatus.PENDING
      )
  )
    throw ApiError.badRequest("Please provide valid details");
  const subscriberRep = orm.getRepository(Subscription);
  const subscriber = await subscriberRep.findOne({ where: { id } ,
    relations: ["item"]
  });
  if (!subscriber) throw ApiError.badRequest("No such subscriber exist");
  try {
    await subscriberRep.update(id, {
      status,
    });
    console.log("old status ",subscriber.status," new status ",status);
    // if subsription active then decrease capacity of item by quantity
    if (subscriber.status!=SubscriptionStatus.ACTIVE && status === SubscriptionStatus.ACTIVE) {
        const itemRep = orm.getRepository(Item);
        await itemRep.update(subscriber.item.id,{
            capacity:subscriber.item.capacity-subscriber.quantity
        });
    }
    // if subsription cancelled then increase capacity of item by quantity
    else if (subscriber.status===SubscriptionStatus.ACTIVE && status === SubscriptionStatus.CANCELLED) {
        const itemRep = orm.getRepository(Item);
        await itemRep.update(subscriber.item.id,{
            capacity:subscriber.item.capacity+subscriber.quantity
        });
    }
    return res.send({
      message: "Subscription updated successfully",
    });
  } catch (e) {
    throw ApiError.internal("Erorr while updating subscription " + e);
  }
}
