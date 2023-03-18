/**
 * Create new user from id of given type
 */

import { Response } from "express";
import { User } from "../entity/User";
import { $Request } from "../type";

export async function postUser(
    req: $Request, res: Response
){
    const {orm} = req.locals;
    const {id,typeId,location,photoUrl} = req.body;
    if(!id || !typeId) return ApiError.badRequest("Please provide valid details");
    const userRep = orm.getRepository(User);
    try{
        const user = userRep.create({
            id,
            type:{
                id:typeId
            },
            location,
            photoUrl
        });
        await userRep.save(user);
        return res.send({
            user
        });

    }
    catch(e){
        return ApiError.internal("Erorr while creating user "+e);
    }
}