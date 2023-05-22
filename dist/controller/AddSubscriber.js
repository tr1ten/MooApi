"use strict";
// recieve user id and quantity and item id
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
exports.addSubscription = void 0;
const Item_1 = require("../entity/Item");
const error_1 = require("../error");
const Subscription_1 = require("../entity/Subscription");
const Buyer_1 = require("../entity/Buyer");
const GetNearBySellerItems_1 = require("./GetNearBySellerItems");
function addSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { userId, itemId, quantity } = req.body;
        // console.log("reachivend for subscription ", userId, itemId, quantity);
        if (!userId || !itemId || !quantity)
            throw error_1.ApiError.badRequest("Please provide valid details");
        const itemRep = orm.getRepository(Item_1.default);
        const item = yield itemRep.findOne({ where: { id: itemId },
            relations: [
                "catalogue",
                "catalogue.seller",
                "catalogue.seller.user",
                "catalogue.seller.user.type"
            ]
        });
        if (!item)
            throw error_1.ApiError.badRequest("No Item found");
        const buyerRep = orm.getRepository(Buyer_1.Buyer);
        const buyer = yield buyerRep.findOne({ where: { userId },
            relations: [
                "user",
            ]
        });
        if (!buyer)
            throw error_1.ApiError.badRequest("No buyer found");
        const subscriptionRep = orm.getRepository(Subscription_1.default);
        const subs = new Subscription_1.default();
        subs.buyer = buyer;
        subs.item = item;
        subs.quantity = quantity;
        const [lat, long] = buyer.user.location.split(",");
        const [lat2, long2] = item.catalogue.seller.user.location.split(",");
        const dist = (0, GetNearBySellerItems_1.getDistanceFromLatLonInKm)(Number(lat), Number(long), Number(lat2), Number(long2));
        subs.distance = dist || 0;
        try {
            yield subscriptionRep.save(subs);
            return res.send({
                message: "Subscription added successfully"
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Erorr while adding subscription " + e);
        }
    });
}
exports.addSubscription = addSubscription;
