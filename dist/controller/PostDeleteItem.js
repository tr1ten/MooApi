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
exports.deleteItem = void 0;
const Item_1 = require("../entity/Item");
const error_1 = require("../error");
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orm } = req.locals;
        const { itemId } = req.body;
        if (!itemId)
            throw error_1.ApiError.badRequest("Please provide valid details");
        const itemRep = orm.getRepository(Item_1.default);
        const item = yield itemRep.findOne({ where: { id: itemId } });
        if (!item)
            throw error_1.ApiError.badRequest("No Item found");
        try {
            yield itemRep.remove(item);
            return res.send({
                message: "Item deleted successfully"
            });
        }
        catch (e) {
            throw error_1.ApiError.internal("Erorr while deleting item " + e);
        }
    });
}
exports.deleteItem = deleteItem;
