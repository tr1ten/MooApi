"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_OPTIONS = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Catalogue_1 = require("./entity/Catalogue");
const Item_1 = require("./entity/Item");
const ItemType_1 = require("./entity/ItemType");
const Seller_1 = require("./entity/Seller");
const User_1 = require("./entity/User");
const UserType_1 = require("./entity/UserType");
const Buyer_1 = require("./entity/Buyer");
const Payment_1 = require("./entity/Payment");
const Subscription_1 = require("./entity/Subscription");
const Seller_2 = require("./subscriber/Seller");
const User_2 = require("./subscriber/User");
const Rating_1 = require("./entity/Rating");
require("dotenv").config();
// environment variables
const env = process.env;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: env.SQL_HOST,
    port: parseInt(env.SQL_PORT),
    username: env.SQL_USER,
    password: env.SQL_PASSWORD,
    database: env.SQL_DATABASE,
    synchronize: true,
    // dropSchema: true,
    // logging: true,
    entities: [
        Catalogue_1.default, Item_1.default, ItemType_1.default, Payment_1.default, Seller_1.default, Subscription_1.default, User_1.User, UserType_1.UserType, Buyer_1.Buyer, Rating_1.default
    ],
    migrations: [
        __dirname + "/migration/*.ts"
    ],
    subscribers: [
        Seller_2.SellerSubscriber, User_2.UserSubscriber
    ]
});
exports.DB_OPTIONS = {
    host: env.SQL_HOST,
    port: env.SQL_PORT,
    user: env.SQL_USER,
    password: env.SQL_PASSWORD,
    database: env.SQL_DATABASE,
};
