import { getItemInfo } from "./controller/GetItem";
import { getItemTypes } from "./controller/GetItemType";
import { getSellerItems } from "./controller/GetSellerCatalogue";
import { deleteItem } from "./controller/PostDeleteItem";
import { postItem } from "./controller/PostItem";
import {postUser} from "./controller/PostUser";

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
    }
];