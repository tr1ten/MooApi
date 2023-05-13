import { Response } from "express";
import Seller from "../entity/Seller";
import { ApiError } from "../error";
import { $Request } from "../type";
import Rating from "../entity/Rating";

export async function postItemRating(req:$Request, res:Response) {
    const { orm } = req.locals;
    const { userId,rating,itemId} = req.body;
    if (!userId || !itemId){
        throw ApiError.badRequest("Please provide valid details");
    }
    try{
        const ratingRep = orm.getRepository(Rating);
    const ratingObj = await ratingRep.findOne({ where: {
        buyer:{
            userId
        },
        item:{
            id:itemId
        }
    }, relations: [] });
    console.log("rating obj",ratingObj);
    if(ratingObj) {
        ratingObj.rating = rating;
        ratingRep.update(ratingObj.id,ratingObj);
    }
    else{
        const ratingObj = {
            buyer:{userId},
            item:{
                id:itemId
            },
            rating:parseInt(rating)
        }
        ratingRep.save(ratingObj);

    }
    }
    catch(e){
        throw ApiError.internal("Something went wrong wrong " + e);
    }
    return res.send({
        messege: "Ratings added"
    })
} 