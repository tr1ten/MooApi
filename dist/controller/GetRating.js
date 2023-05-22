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
exports.getRating = void 0;
const Seller_1 = require("../entity/Seller");
const error_1 = require("../error");
function getRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { userId } = req.query;
        if (!userId) {
            throw error_1.ApiError.badRequest("Please provide valid details");
        }
        const sellerRep = orm.getRepository(Seller_1.default);
        const seller = yield sellerRep.findOne({ where: { userId: userId }, relations: [] });
        if (!seller) {
            throw error_1.ApiError.badRequest("No Seller found");
        }
        try {
            return res.send({
                rating: seller.rating
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Erorr while getting rating");
        }
    });
}
exports.getRating = getRating;
