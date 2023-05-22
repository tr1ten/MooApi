"use strict";
/**
 * Create new user from id of given type
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = void 0;
const User_1 = require("../entity/User");
const UserType_1 = require("../entity/UserType");
const error_1 = require("../error");
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { id, typeId, location, image, name } = req.body;
        // console.log("reachivend ",id,typeId,location,photoUrl);
        if (!id || !typeId)
            throw error_1.ApiError.badRequest("Please provide valid details");
        const userTypeRep = orm.getRepository(UserType_1.UserType);
        const userType = yield userTypeRep.findOne({ where: { id: typeId } });
        if (!userType)
            throw error_1.ApiError.badRequest("No such user type exist");
        const userRep = orm.getRepository(User_1.User);
        // console.log("id",id,"typeId",typeId);
        try {
            const user = userRep.create({
                id,
                type: typeId,
                location,
                image,
                name
            });
            yield userRep.save(user);
            return res.send({
                user
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Erorr while creating user " + e);
        }
    });
}
exports.postUser = postUser;
