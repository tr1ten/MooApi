// this update the subscription of the user

import { Request, Response } from "express";
import { User } from "../entity/User";
import { UserType } from "../entity/UserType";
import { $Request } from "../type";
import Subscription, { SubscriptionStatus } from "../entity/Subscription";
import { ApiError } from "../error";

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
  const subscriber = await subscriberRep.findOne({ where: { id } });
  if (!subscriber) throw ApiError.badRequest("No such subscriber exist");
  try {
    await subscriberRep.update(id, {
      status,
    });
    return res.send({
      message: "Subscription updated successfully",
    });
  } catch (e) {
    throw ApiError.internal("Erorr while updating subscription " + e);
  }
}
