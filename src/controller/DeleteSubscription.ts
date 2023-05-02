// given sub id delete that subscription from db

import { Response } from "express";
import Subscription from "../entity/Subscription";
import { ApiError } from "../error";
import { $Request } from "../type";

export async function deleteSubscription(req: $Request, res: Response) {
    const { orm } = req.locals;
    const { subId } = req.body;
    if (!subId) throw ApiError.badRequest("Please provide valid details");
    const subscriptionRep = orm.getRepository(Subscription);
    const subscription = await subscriptionRep.findOne({ where: { id: subId } });
    if (!subscription) throw ApiError.badRequest("No Subscription found");
    try {
        await subscriptionRep.remove(subscription);
        return res.send({
            message: "Subscription deleted successfully"
        });
    }
    catch (e) {
        throw ApiError.internal("Erorr while deleting subscription " + e);
    }
}