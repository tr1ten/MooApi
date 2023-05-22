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
exports.getNearBySellerItems = exports.getDistanceFromLatLonInKm = void 0;
const error_1 = require("../error");
const Item_1 = require("../entity/Item");
const Subscription_1 = require("../entity/Subscription");
const User_1 = require("../entity/User");
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2)
        return 0;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
exports.getDistanceFromLatLonInKm = getDistanceFromLatLonInKm;
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
function getNearBySellerItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { userId, d } = req.query;
        const maxDistance = d || 50;
        if (!userId)
            throw error_1.ApiError.badRequest("Please provide valid details");
        const userRep = orm.getRepository(User_1.User);
        const user = yield userRep.findOne({ where: { id: userId } });
        if (!user)
            throw error_1.ApiError.badRequest("No User found");
        const itemsRep = orm.getRepository(Item_1.default);
        const items = yield itemsRep.find({
            relations: [
                "catalogue",
                "catalogue.seller",
                "type",
                "catalogue.seller.user",
                "ratings",
                "ratings.buyer"
            ],
        }); // TODO: add query to find items in same location
        const [lat, long] = user.location.split(",");
        const userSubs = yield orm.getRepository(Subscription_1.default).find({
            where: {
                buyer: {
                    userId: userId,
                },
            },
            relations: ["item", "item.catalogue", "item.catalogue.seller"],
        });
        // filter those seller who are more than maxDist km away
        const notSubItems = items.filter((item) => {
            let flag = true;
            const [lat2, long2] = item.catalogue.seller.user.location.split(",");
            const dist = getDistanceFromLatLonInKm(Number(lat), Number(long), Number(lat2), Number(long2));
            if (dist > parseInt(maxDistance))
                return false;
            userSubs.forEach((sub) => {
                if (sub.item.id === item.id) {
                    flag = false;
                }
            });
            return flag;
        });
        return res.send(notSubItems);
    });
}
exports.getNearBySellerItems = getNearBySellerItems;
