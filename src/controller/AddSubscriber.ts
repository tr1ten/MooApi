// recieve user id and quantity and item id

import { Response } from "express";
import Item from "../entity/Item";
import { User } from "../entity/User";
import { ApiError } from "../error";
import { $Request } from "../type";
import Subscription from "../entity/Subscription";

export async function addSubscription(req: $Request, res: Response) {
    const { orm } = req.locals;
    const { userId, itemId, quantity } = req.body;
    if (!userId || !itemId || !quantity)
        throw ApiError.badRequest("Please provide valid details");
    const itemRep = orm.getRepository(Item);
    const item = await itemRep.findOne({ where: { id: itemId } });
    if (!item)
        throw ApiError.badRequest("No Item found");
    const userRep = orm.getRepository(User);
    const user = await userRep.findOne({ where: { id: userId } });
    if (!user)
        throw ApiError.badRequest("No User found");
    const subscriptionRep = orm.getRepository(Subscription);
    const subs = subscriptionRep.create({
        item: item,
        buyer:user,
        quantity:quantity
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