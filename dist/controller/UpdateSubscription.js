"use strict";
// this update the subscription of the user
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
exports.UpdateSubscription = void 0;
const Subscription_1 = require("../entity/Subscription");
const error_1 = require("../error");
const Item_1 = require("../entity/Item");
function UpdateSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { id, status } = req.body;
        console.log("reachivend for subscription ", id, status);
        if (!id ||
            !status ||
            (status !== Subscription_1.SubscriptionStatus.ACTIVE &&
                status !== Subscription_1.SubscriptionStatus.CANCELLED &&
                status !== Subscription_1.SubscriptionStatus.PENDING))
            throw error_1.ApiError.badRequest("Please provide valid details");
        const subscriberRep = orm.getRepository(Subscription_1.default);
        const subscriber = yield subscriberRep.findOne({ where: { id },
            relations: ["item"]
        });
        if (!subscriber)
            throw error_1.ApiError.badRequest("No such subscriber exist");
        try {
            yield subscriberRep.update(id, {
                status,
            });
            console.log("old status ", subscriber.status, " new status ", status);
            // if subsription active then decrease capacity of item by quantity
            if (subscriber.status != Subscription_1.SubscriptionStatus.ACTIVE && status === Subscription_1.SubscriptionStatus.ACTIVE) {
                const itemRep = orm.getRepository(Item_1.default);
                yield itemRep.update(subscriber.item.id, {
                    capacity: subscriber.item.capacity - subscriber.quantity
                });
            }
            // if subsription cancelled then increase capacity of item by quantity
            else if (subscriber.status === Subscription_1.SubscriptionStatus.ACTIVE && status === Subscription_1.SubscriptionStatus.CANCELLED) {
                const itemRep = orm.getRepository(Item_1.default);
                yield itemRep.update(subscriber.item.id, {
                    capacity: subscriber.item.capacity + subscriber.quantity
                });
            }
            return res.send({
                message: "Subscription updated successfully",
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Erorr while updating subscription " + e);
        }
    });
}
exports.UpdateSubscription = UpdateSubscription;
