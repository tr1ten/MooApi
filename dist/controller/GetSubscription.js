"use strict";
// return all subscriptions of user depending on user type
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
exports.getSubscriptions = void 0;
const User_1 = require("../entity/User");
const error_1 = require("../error");
const Subscription_1 = require("../entity/Subscription");
function getSubscriptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { userId } = req.query;
        if (!userId)
            throw error_1.ApiError.badRequest("Please provide valid details");
        const userRep = orm.getRepository(User_1.User);
        const user = yield userRep.findOne({
            where: { id: userId },
            relations: ["type"],
        });
        if (!user)
            throw error_1.ApiError.badRequest("No User found");
        if (user.type.label === "Buyer") {
            const subscriptionRep = orm.getRepository(Subscription_1.default);
            const subscriptions = yield subscriptionRep.find({
                where: {
                    buyer: {
                        userId: userId,
                    },
                },
                relations: [
                    "item",
                    "item.type",
                    "item.catalogue",
                    "item.catalogue.seller",
                    "item.catalogue.seller.user",
                    "item.ratings.buyer"
                ],
            });
            return res.send(subscriptions);
        }
        else {
            // find all subscriber of seller
            const subscriptionRep = orm.getRepository(Subscription_1.default);
            const subscriptions = yield subscriptionRep.find({
                where: {
                    item: {
                        catalogue: {
                            seller: {
                                userId: userId,
                            },
                        },
                    },
                },
                relations: ["item.type", "item.catalogue", "buyer", "buyer.user", "buyer.user.type", "item.ratings", "item.ratings.buyer"],
            });
            return res.send(subscriptions);
        }
    });
}
exports.getSubscriptions = getSubscriptions;
