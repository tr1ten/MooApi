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
];