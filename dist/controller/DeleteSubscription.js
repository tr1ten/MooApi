"use strict";
// given sub id delete that subscription from db
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
exports.deleteSubscription = void 0;
const Subscription_1 = require("../entity/Subscription");
const error_1 = require("../error");
const Item_1 = require("../entity/Item");
function deleteSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { subId } = req.body;
        if (!subId)
            throw error_1.ApiError.badRequest("Please provide valid details");
        const subscriptionRep = orm.getRepository(Subscription_1.default);
        const subscription = yield subscriptionRep.findOne({ where: { id: subId },
            relations: [
                'item'
            ]
        });
        if (!subscription)
            throw error_1.ApiError.badRequest("No Subscription found");
        try {
            yield subscriptionRep.remove(subscription);
            // increase the capacity of item
            const item = subscription.item;
            item.capacity += subscription.quantity;
            yield orm.getRepository(Item_1.default).save(item);
            return res.send({
                message: "Subscription deleted successfully"
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Erorr while deleting subscription " + e);
        }
    });
}
exports.deleteSubscription = deleteSubscription;
