import { Response } from "express";
import { $Request } from "../type";
import { User } from "../entity/User";
import { ApiError } from "../error";
export async function updateUser(req:$Request,res:Response){
    const {orm} = req.locals;
    const {userId:id,name,image,bio} = req.body;
    if(!id || (!name && 
        !image && !bio
        )) throw ApiError.badRequest("Please provide valid details");
    const userRep = orm.getRepository(User);
    try{
        await userRep.update(id,{
            name,image,bio
        });
        return res.send({
            message: "User updated successfully"
        })
    }catch(e){
        throw ApiError.internal("Error while updating user "+e);
    }
}