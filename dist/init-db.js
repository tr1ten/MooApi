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
const db_1 = require("./db");
const ItemType_1 = require("./entity/ItemType");
const UserType_1 = require("./entity/UserType");
const addUserTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const utrep = db_1.AppDataSource.getRepository(UserType_1.UserType);
    const usertypes = [
        {
            label: "Seller",
        },
        {
            label: "Buyer",
        },
    ];
    return utrep.save(usertypes);
});
const addItemTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const utrep = db_1.AppDataSource.getRepository(ItemType_1.default);
    const usertypes = [
        {
            label: "Cow Milk",
            description: "Milk fetched from cow",
            image: "https://cdn-icons-png.flaticon.com/256/1998/1998610.png",
            unit: "litre"
        },
        {
            label: "Buffalo Milk",
            description: "Milk fetched from buffalo",
            image: "https://cdn-icons-png.flaticon.com/512/1702/1702816.png",
            unit: "litre"
        },
        {
            label: "Goat Milk",
            description: "Milk fetched from goat",
            image: "https://cdn-icons-png.flaticon.com/512/1998/1998662.png",
            unit: "litre"
        },
        {
            label: "Eggs",
            description: "Eggs fetched from chicken",
            image: "https://cdn-icons-png.flaticon.com/256/2713/2713474.png",
            unit: "egg"
        },
    ];
    return utrep.save(usertypes);
});
db_1.AppDataSource.initialize()
    .then(() => {
    Promise.all([addItemTypes(), addUserTypes()])
        .then(() => {
        console.log("Successfully added all data");
        db_1.AppDataSource.destroy();
    })
        .catch((e) => {
        console.log("error occured while adding ", e);
    });
})
    .catch((e) => {
    console.log("error initializing ", e);
});
