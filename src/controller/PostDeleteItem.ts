import { Response } from "express";
import Item from "../entity/Item";
import { ApiError } from "../error";
import { $Request } from "../type";

export async function deleteItem(req: $Request, res: Response) {
    const {orm} = req.locals;
    const {itemId} = req.body;
    if(!itemId) throw ApiError.badRequest("Please provide valid details");
    const itemRep = orm.getRepository(Item);
    const item = await itemRep.findOne({where:{id:itemId}});
    if(!item) throw ApiError.badRequest("No Item found");
    try{
        await itemRep.remove(item);
        return res.send({
            message:"Item deleted successfully"
        });
    }
    catch(e){
        throw ApiError.internal("Erorr while deleting item "+e);
    }
}