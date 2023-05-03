// This take user id as query parameter and returns the catalogue of all items  sharing same seller location as the user
import { Response } from "express";
import Catalogue from "../entity/Catalogue";
import Seller from "../entity/Seller";
import { ApiError } from "../error";
import { $Request } from "../type";
import Item from "../entity/Item";

export async function getNearBySellerItems(
    req: $Request, res: Response
){
    const {orm} = req.locals;
    const {userId} = req.query;
    if(!userId) throw ApiError.badRequest("Please provide valid details");
    const itemsRep = orm.getRepository(Item);
    const items = await itemsRep.find({
        relations:["catalogue",
        "catalogue.seller","type"
    ]
    }); // TODO: add query to find items in same location
    if(!items) throw ApiError.badRequest("No Seller Items found");
    // console.log("getting seller catalogue ",items,userId);
    try{
        return res.send(items); 
    }
    catch(e){
        throw ApiError.internal("Erorr while getting items for user "+e);
    }
}