import { Response } from "express";
import Catalogue from "../entity/Catalogue";
import Seller from "../entity/Seller";
import { ApiError } from "../error";
import { $Request } from "../type";

export async function getSellerItems(
    req: $Request, res: Response
){
    const {orm} = req.locals;
    const {userId} = req.params;
    const sellerRep = orm.getRepository(Seller);
    const user = await sellerRep.findOne({where:{userId},relations:["catalogue","catalogue.items"]});
    if(!user) throw ApiError.badRequest("No User found");
    try{
        return res.send({
            catelogue: user.catalogue
        });
    }
    catch(e){
        throw ApiError.internal("Erorr while getting items for user "+e);
    }
}