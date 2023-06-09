import "reflect-metadata"
import { DataSource } from "typeorm";
import Catalogue from "./entity/Catalogue";
import Item from "./entity/Item";
import ItemType from "./entity/ItemType";
import Seller from "./entity/Seller";
import { User } from "./entity/User";
import { UserType } from "./entity/UserType";
import {Buyer} from "./entity/Buyer";
import Payment from "./entity/Payment";
import Subscription from "./entity/Subscription";
import { SellerSubscriber } from "./subscriber/Seller";
import { UserSubscriber } from "./subscriber/User";
import Rating from "./entity/Rating";
require("dotenv").config()
// environment variables
const env = process.env

export const AppDataSource = new DataSource({
    type: "mssql",
    host:  env.SQL_HOST,
    port: parseInt(env.SQL_PORT),
    username:  env.SQL_USER,
    password: env.SQL_PASSWORD,
    database: env.SQL_DATABASE,
    synchronize: true,
    // dropSchema: true,
    // logging: true,
    entities: [
         Catalogue,Item,ItemType,Payment , Seller,Subscription,User,UserType,Buyer,Rating
    ],
    migrations: [
        __dirname + "/migration/*.ts"
    ],
    subscribers: [
        SellerSubscriber,UserSubscriber
    ]
})
export const DB_OPTIONS = {
	host: env.SQL_HOST,
	port:   env.SQL_PORT,
	user: env.SQL_USER,
	password: env.SQL_PASSWORD,
	database: env.SQL_DATABASE,
};