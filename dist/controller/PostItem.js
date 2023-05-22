"use strict";
/**
 * Create new item for user
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
exports.postItem = void 0;
const Item_1 = require("../entity/Item");
const Seller_1 = require("../entity/Seller");
const error_1 = require("../error");
function postItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { itemTypeId, userId, capacity, price, id } = req.body;
        if (!itemTypeId || !userId || !capacity || !price)
            throw error_1.ApiError.badRequest("Please provide valid details");
        const itemRep = orm.getRepository(Item_1.default);
        const sellerRep = orm.getRepository(Seller_1.default);
        const user = yield sellerRep.findOne({ where: { userId: userId },
            relations: ["catalogue"]
        });
        console.log("post item user", user);
        if (!user)
            return error_1.ApiError.badRequest("No Such User exist");
        try {
            const item = ({
                type: {
                    id: itemTypeId
                },
                capacity,
                catalogue: user.catalogue,
                price
            });
            if (!id) {
                yield itemRep.save(item);
            }
            else {
                yield itemRep.update(id, item);
            }
            return res.send({
                item
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Erorr while creating item for user " + e);
        }
    });
}
exports.postItem = postItem;
