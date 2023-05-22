"use strict";
// this subscribes to User crud action and add new cart on insert
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserSubscriber = void 0;
const typeorm_1 = require("typeorm");
const Seller_1 = require("../entity/Seller");
const User_1 = require("../entity/User");
const Buyer_1 = require("../entity/Buyer");
let UserSubscriber = class UserSubscriber {
    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
        return User_1.User;
    }
    afterInsert(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(event.entity.type) === 1) {
                const seller = new Seller_1.default();
                seller.userId = event.entity.id;
                seller.user = event.entity;
                // console.log("seller ",seller);
                yield event.manager.getRepository(Seller_1.default).save(seller);
            }
            else {
                const buyer = new Buyer_1.Buyer();
                buyer.userId = event.entity.id;
                buyer.user = event.entity;
                // console.log("buyer ",buyer);
                yield event.manager.getRepository(Buyer_1.Buyer).save(buyer);
            }
        });
    }
};
UserSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], UserSubscriber);
exports.UserSubscriber = UserSubscriber;
