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
    const {itemTypeId,userId,capacity,price} = req.body;
    if(!itemTypeId || !userId || !capacity || !price) throw ApiError.badRequest("Please provide valid details");
    const itemRep = orm.getRepository(Item);
    const sellerRep = orm.getRepository(Seller);
    const user = await sellerRep.findOne({where:{userId:userId},
        relations:["catalogue"]
    });
    console.log("post item user",user);
    if(!user) return ApiError.badRequest("No Such User exist");
    try{
        const item = itemRep.create({
            type:{
                id:itemTypeId
            },
            capacity,
            catalogue:user.catalogue,
            price
            
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