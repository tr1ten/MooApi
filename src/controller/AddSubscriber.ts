// recieve user id and quantity and item id

import { Response } from "express";
import Item from "../entity/Item";
import { User } from "../entity/User";
import { ApiError } from "../error";
import { $Request } from "../type";
import Subscription from "../entity/Subscription";
import { Buyer } from "../entity/Buyer";

export async function addSubscription(req: $Request, res: Response) {
    const { orm } = req.locals;
    const { userId, itemId, quantity } = req.body;
    console.log("reachivend for subscription ", userId, itemId, quantity);
    if (!userId || !itemId || !quantity)
        throw ApiError.badRequest("Please provide valid details");
    const itemRep = orm.getRepository(Item);
    const item = await itemRep.findOne({ where: { id: itemId } });
    if (!item)
        throw ApiError.badRequest("No Item found");
    const buyerRep = orm.getRepository(Buyer);
    const buyer = await buyerRep.findOne({ where: { userId } });
    if (!buyer)
        throw ApiError.badRequest("No buyer found");
    const subscriptionRep = orm.getRepository(Subscription);
    const subs:Partial<Subscription> =  ({
        item,
        buyer,
        quantity,
    });
    try {
        await subscriptionRep.save(subs);
        return res.send({
            message: "Subscription added successfully"
        });
    }
    catch (e) {
        throw ApiError.internal("Erorr while adding subscription " + e);
    }

}