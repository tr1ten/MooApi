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
exports.AppRoutes = void 0;
const AddSubscriber_1 = require("./controller/AddSubscriber");
const DeleteSubscription_1 = require("./controller/DeleteSubscription");
const GetItem_1 = require("./controller/GetItem");
const GetItemType_1 = require("./controller/GetItemType");
const GetNearBySellerItems_1 = require("./controller/GetNearBySellerItems");
const GetSellerCatalogue_1 = require("./controller/GetSellerCatalogue");
const GetSubscription_1 = require("./controller/GetSubscription");
const GetUser_1 = require("./controller/GetUser");
const PostDeleteItem_1 = require("./controller/PostDeleteItem");
const PostItem_1 = require("./controller/PostItem");
const PostItemRating_1 = require("./controller/PostItemRating");
const PostUser_1 = require("./controller/PostUser");
const UpdateSubscription_1 = require("./controller/UpdateSubscription");
const UpdateUser_1 = require("./controller/UpdateUser");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: "/user",
        method: "post",
        action: PostUser_1.postUser
    },
    {
        path: "/user",
        method: "get",
        action: GetUser_1.getUser
    },
    {
        path: "/user/update",
        method: "post",
        action: UpdateUser_1.updateUser,
    },
    {
        path: '/user/catalogue',
        method: 'get',
        action: GetSellerCatalogue_1.getSellerItems,
    },
    {
        path: "/item",
        method: "post",
        action: PostItem_1.postItem
    },
    {
        path: "/item",
        method: "get",
        action: GetItem_1.getItemInfo,
    },
    {
        path: "/",
        method: "get",
        action: (req, res) => __awaiter(void 0, void 0, void 0, function* () { res.send("Hello World"); })
    },
    {
        path: "/itemType",
        method: "get",
        action: GetItemType_1.getItemTypes,
    },
    {
        path: "/item/delete",
        method: "post",
        action: PostDeleteItem_1.deleteItem
    },
    {
        path: "/seller/nearby",
        method: "get",
        action: GetNearBySellerItems_1.getNearBySellerItems
    },
    {
        path: "/subscription",
        method: "post",
        action: AddSubscriber_1.addSubscription
    },
    {
        path: "/subscription",
        method: "delete",
        action: DeleteSubscription_1.deleteSubscription
    },
    {
        path: "/subscription",
        method: "get",
        action: GetSubscription_1.getSubscriptions
    },
    {
        path: "/subscription/status",
        method: "post",
        action: UpdateSubscription_1.UpdateSubscription
    },
    {
        path: "/rating",
        method: "post",
        action: PostItemRating_1.postItemRating
    }
];
