// given sub id delete that subscription from db

import { Response } from "express";
import Subscription from "../entity/Subscription";
import { ApiError } from "../error";
import { $Request } from "../type";
import Item from "../entity/Item";

export async function deleteSubscription(req: $Request, res: Response) {
    const { orm } = req.locals;
    const { subId } = req.body;
    if (!subId) throw ApiError.badRequest("Please provide valid details");
    const subscriptionRep = orm.getRepository(Subscription);
    const subscription = await subscriptionRep.findOne({ where: { id: subId } ,
        relations:[
            'item'
        ]
    });
    if (!subscription) throw ApiError.badRequest("No Subscription found");
    try {
        await subscriptionRep.remove(subscription);
        // increase the capacity of item
        const item = subscription.item;
        item.capacity += subscription.quantity;
        await orm.getRepository(Item).save(item);
        return res.send({
            message: "Subscription deleted successfully"
        });
    }
    catch (e) {
        throw ApiError.internal("Erorr while deleting subscription " + e);
    }
}