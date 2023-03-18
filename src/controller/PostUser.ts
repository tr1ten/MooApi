/**
 * Create new user from id of given type
 */

import { NextFunction, Response } from "express";
import { User } from "../entity/User";
import { UserType } from "../entity/UserType";
import { ApiError } from "../error";
import { $Request } from "../type";
export async function postUser(
    req: $Request, res: Response
){
    const {orm} = req.locals;
    const {id,typeId,location,photoUrl} = req.body;

    if(!id || !typeId) throw ApiError.badRequest("Please provide valid details");
    const userTypeRep = orm.getRepository(UserType);
    const userType = await userTypeRep.findOne({where:{id:typeId}});
    if(!userType) throw ApiError.badRequest("No such user type exist");
    const userRep = orm.getRepository(User);
    console.log("id",id,"typeId",typeId);
    try{
        const user = userRep.create({
            id,
            type: typeId
        });
        await userRep.save(user);
        
        return res.send({
            user
        });

    }
    catch(e){
         throw ApiError.internal("Erorr while creating user "+e);
    }
}