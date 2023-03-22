import { getSellerItems } from "./controller/GetSellerCatalogue";
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
        path:"/",
        method:"get",
        action: async (req,res)=>{res.send("Hello World")}
    }
];