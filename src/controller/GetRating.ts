import { Response } from "express";
import Seller from "../entity/Seller";
import { ApiError } from "../error";
import { $Request } from "../type";

export async function getRating(req:$Request, res:Response) {
    const { orm } = req.locals;
    const { userId } = req.query;
    if (!userId){
        throw ApiError.badRequest("Please provide valid details");
    }
    const sellerRep = orm.getRepository(Seller);
    const seller = await sellerRep.findOne({ where: { userId: userId as string }, relations: [] });
    if(!seller){
        throw ApiError.badRequest("No Seller found");
    }
    try{
        return res.send({
            rating:seller.rating
        });
    }
    catch(e){
        throw ApiError.internal("Erorr while getting rating");
    }
}