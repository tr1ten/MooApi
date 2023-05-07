// This take user id as query parameter and returns the catalogue of all items  sharing same seller location as the user
// donot show those items which already have subscription by that user
import { Response } from "express";
import Catalogue from "../entity/Catalogue";
import Seller from "../entity/Seller";
import { ApiError } from "../error";
import { $Request } from "../type";
import Item from "../entity/Item";
import Subscription from "../entity/Subscription";
import { User } from "../entity/User";

export async function getNearBySellerItems(
    req: $Request, res: Response
){
    const {orm} = req.locals;
    const {userId} = req.query;
    if(!userId) throw ApiError.badRequest("Please provide valid details");
    const userRep = orm.getRepository(User);
    const user = await userRep.findOne({where:{id:userId as any}});
    if(!user) throw ApiError.badRequest("No User found");
    const itemsRep = orm.getRepository(Item);
    const items = await itemsRep.find({
        relations:["catalogue",
        "catalogue.seller","type",
        "catalogue.seller.user"
    ]
    }); // TODO: add query to find items in same location
    const userSubs = await orm.getRepository(Subscription).find({
        where:{
            buyer:{
                userId:userId as any
            }
        },
        relations:["item","item.catalogue","item.catalogue.seller"]
    })
    const notSubItems = items.filter((item)=>{
        let flag = true;
        userSubs.forEach((sub)=>{
            if(sub.item.id === item.id){
                flag = false;
            }
        })
        return flag;
    });
    return res.send(notSubItems);
}