"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buyer = void 0;
const typeorm_1 = require("typeorm");
const Subscription_1 = require("./Subscription");
const UserType_1 = require("./UserType");
const User_1 = require("./User");
let Buyer = class Buyer {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Buyer.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => User_1.User, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Buyer.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserType_1.UserType),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", UserType_1.UserType)
], Buyer.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Subscription_1.default, subscription => subscription.buyer),
    __metadata("design:type", Array)
], Buyer.prototype, "subscriptions", void 0);
Buyer = __decorate([
    (0, typeorm_1.Entity)()
], Buyer);
exports.Buyer = Buyer;
