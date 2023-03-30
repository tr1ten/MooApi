import "reflect-metadata"
import { DataSource } from "typeorm";
import Catalogue from "./entity/Catalogue";
import Item from "./entity/Item";
import ItemType from "./entity/ItemType";
import Seller from "./entity/Seller";
import { User } from "./entity/User";
import { UserType } from "./entity/UserType";
require("dotenv").config()
// environment variables
const env = process.env

export const AppDataSource = new DataSource({
    type: "mariadb",
    host:  env.SQL_HOST,
    port: parseInt(env.SQL_PORT),
    username:  env.SQL_USER,
    password: env.SQL_PASSWORD,
    database: env.SQL_DATABASE,
    synchronize: true,
    // dropSchema: true,
    logging: true,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    migrations: [
        __dirname + "/migration/*.ts"
    ],
    subscribers: [
        __dirname + "/subscriber/*.ts"
    ]
})
export const DB_OPTIONS = {
	host: env.SQL_HOST,
	port:   env.SQL_PORT,
	user: env.SQL_USER,
	password: env.SQL_PASSWORD,
	database: env.SQL_DATABASE,
};