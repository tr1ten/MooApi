"use strict";
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
exports.updateUser = void 0;
const User_1 = require("../entity/User");
const error_1 = require("../error");
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { userId: id, name, image, bio } = req.body;
        if (!id || (!name &&
            !image && !bio))
            throw error_1.ApiError.badRequest("Please provide valid details");
        const userRep = orm.getRepository(User_1.User);
        try {
            yield userRep.update(id, {
                name, image, bio
            });
            return res.send({
                message: "User updated successfully"
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Error while updating user " + e);
        }
    });
}
exports.updateUser = updateUser;
