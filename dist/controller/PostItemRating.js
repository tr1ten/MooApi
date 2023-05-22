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
exports.postItemRating = void 0;
const error_1 = require("../error");
const Rating_1 = require("../entity/Rating");
function postItemRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { userId, rating, itemId } = req.body;
        if (!userId || !itemId) {
            throw error_1.ApiError.badRequest("Please provide valid details");
        }
        try {
            const ratingRep = orm.getRepository(Rating_1.default);
            const ratingObj = yield ratingRep.findOne({ where: {
                    buyer: {
                        userId
                    },
                    item: {
                        id: itemId
                    }
                }, relations: [] });
            console.log("rating obj", ratingObj);
            if (ratingObj) {
                ratingObj.rating = rating;
                ratingRep.update(ratingObj.id, ratingObj);
            }
            else {
                const ratingObj = {
                    buyer: { userId },
                    item: {
                        id: itemId
                    },
                    rating: parseInt(rating)
                };
                ratingRep.save(ratingObj);
            }
        }
        catch (e) {
            throw error_1.ApiError.internal("Something went wrong wrong " + e);
        }
        return res.send({
            messege: "Ratings added"
        });
    });
}
exports.postItemRating = postItemRating;
