// return all subscriptions of user depending on user type

import { Response } from "express";
import { User } from "../entity/User";
import { ApiError } from "../error";
import { $Request } from "../type";
import Subscription from "../entity/Subscription";

export async function getSubscriptions(req: $Request, res: Response) {
    const { orm } = req.locals;
    const { userId } = req.query;
    if (!userId) throw ApiError.badRequest("Please provide valid details");
    const userRep = orm.getRepository(User);
    const user = await userRep.findOne({ where: { id: userId as any } ,
        relations:["type"]
    });
    // console.log("Recieved for subscription ", user);
    if (!user) throw ApiError.badRequest("No User found");
    if (user.type.label === 'Buyer') {
        const subscriptionRep = orm.getRepository(Subscription);
        const subscriptions = await subscriptionRep.find({ where: { buyer: {
            userId: userId as any
        } }, relations: ['item',
            'item.type',
            'item.catalogue',
            'item.catalogue.seller',
            'item.catalogue.seller.user'
    ] });
        return res.send(subscriptions);
    }
    else{
        // find all subscriber of seller
        const subscriptionRep = orm.getRepository(Subscription);
        const subscriptions = await subscriptionRep.find({ where: { item: 
            {
                catalogue:{
                    seller:{
                        userId:userId as any
                    }
                }
            } }, relations: ['buyer','buyer.user'] });
        return res.send(subscriptions);
    }
}