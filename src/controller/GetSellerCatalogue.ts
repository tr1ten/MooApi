import { Response } from "express";
import Catalogue from "../entity/Catalogue";
import Seller from "../entity/Seller";
import { ApiError } from "../error";
import { $Request } from "../type";

export async function getSellerItems(
    req: $Request, res: Response
){
    const {orm} = req.locals;
    const {userId} = req.query;
    if(!userId) throw ApiError.badRequest("Please provide valid details");
    const sellerRep = orm.getRepository(Seller);
    const user = await sellerRep.findOne({where:{userId:userId as string},relations:["catalogue","catalogue.items",
    "catalogue.items.type"
]});
    if(!user) throw ApiError.badRequest("No User found");
    console.log("getting seller catalogue ",user,userId);
    try{
        return res.send(user.catalogue); 
    }
    catch(e){
        throw ApiError.internal("Erorr while getting items for user "+e);
    }
}