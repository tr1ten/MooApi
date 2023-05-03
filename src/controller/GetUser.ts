import { Response } from "express";
import { $Request } from "../type";
import { User } from "../entity/User";
import { ApiError } from "../error";

// get user info
export async function getUser(req:$Request, res:Response) {
    const { orm } = req.locals;
    const { userId } = req.query;
    console.log(userId,"here ");
    if (!userId)
        throw ApiError.badRequest("Please provide valid details");
    const userRep = orm.getRepository(User);
    const user = await userRep.findOne({ where: { id: userId.toString() } ,relations:[
        'type'
    ]});
    if (!user)
        throw ApiError.badRequest("No User found");
    // console.log("getting user info ", user, userId);
    try {
        return res.send(user);
    }
    catch (e) {
        throw ApiError.internal("Erorr while getting items for user " + e);
    }
}