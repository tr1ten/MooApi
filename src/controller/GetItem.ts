import { Response } from "express";
import Item from "../entity/Item";
import { ApiError } from "../error";
import { $Request } from "../type";

export async function getItemInfo(req: $Request, res: Response) {
    const {orm} = req.locals;
    const {itemId} = req.query;
    if(!itemId) throw ApiError.badRequest("Please provide valid details");
    const itemRep = orm.getRepository(Item);
    const item = await itemRep.findOne({where:{id:parseInt(itemId.toString()) },relations:["type"]});
    if(!item) throw ApiError.badRequest("No Item found");
    try{
        return res.send(item);
    }
    catch(e){
        throw ApiError.internal("Erorr while getting item info "+e);
    }
}