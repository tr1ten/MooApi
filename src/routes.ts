import { addSubscription } from "./controller/AddSubscriber";
import { deleteSubscription } from "./controller/DeleteSubscription";
import { getItemInfo } from "./controller/GetItem";
import { getItemTypes } from "./controller/GetItemType";
import { getNearBySellerItems } from "./controller/GetNearBySellerItems";
import { getSellerItems } from "./controller/GetSellerCatalogue";
import { getSubscriptions } from "./controller/GetSubscription";
import { getUser } from "./controller/GetUser";
import { deleteItem } from "./controller/PostDeleteItem";
import { postItem } from "./controller/PostItem";
import {postUser} from "./controller/PostUser";
import { UpdateSubscription } from "./controller/UpdateSubscription";
import { updateUser } from "./controller/UpdateUser";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/user",
        method: "post",
        action: postUser
    },
    {
        path: "/user",
        method: "get",
        action: getUser
    },
    {
        path: "/user/update",
        method: "post",
        action: updateUser,  
    },
    {
      path: '/user/catalogue',
      method: 'get',
      action: getSellerItems,  
    },
    {
        path:"/item",
        method:"post",
        action:postItem
    },
    {
        path:"/item",
        method:"get",
        action: getItemInfo,
    },
    {
        path:"/",
        method:"get",
        action: async (req,res)=>{res.send("Hello World")}
    },
    {
        path:"/itemType",
        method:"get",
        action: getItemTypes,
    },
    {
        path:"/item/delete",
        method:"post",
        action: deleteItem
    },
    {
        path: "/seller/nearby",
        method: "get",
        action: getNearBySellerItems
    },
    {
        path: "/subscription",
        method: "post",
        action: addSubscription
    },
    {
        path: "/subscription",
        method: "delete",
        action: deleteSubscription
    },
    {
        path: "/subscription",
        method: "get",
        action: getSubscriptions
    },
    {
        path: "/subscription/status",
        method: "post",
        action: UpdateSubscription
    }
];