/**
 * Create new item for user
 */

import { Response } from "express";
import Item from "../entity/Item";
import Seller from "../entity/Seller";
import { ApiError } from "../error";

import { $Request } from "../type";

export async function postItem(
    req: $Request, res: Response
){
    const {orm} = req.locals;
    const {itemTypeId,userId,capacity} = req.body;
    const itemRep = orm.getRepository(Item);
    const userRep = orm.getRepository(Seller);
    const user = await userRep.findOne({where:{user:userId},
        relations:["catalogue"]
    });
    if(!user) return ApiError.badRequest("No Such User exist");
    try{
        const item = itemRep.create({
            type:{
                id:itemTypeId
            },
            capacity,
            catalogue:user.catalogue,
            
        });
        await itemRep.save(item);
        return res.send({
            item
        });

    }
    catch(e){
        throw ApiError.internal("Erorr while creating item for user "+e);
    }
}