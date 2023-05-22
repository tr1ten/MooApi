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
const typeorm_1 = require("typeorm");
const Catalogue_1 = require("./Catalogue");
const User_1 = require("./User");
const UserType_1 = require("./UserType");
let Seller = class Seller {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Seller.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => User_1.User, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Seller.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        nullable: true
    }),
    __metadata("design:type", String)
], Seller.prototype, "descroption", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => Catalogue_1.default, catalogue => catalogue.seller),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Catalogue_1.default)
], Seller.prototype, "catalogue", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserType_1.UserType),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", UserType_1.UserType)
], Seller.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 1
    }),
    __metadata("design:type", Number)
], Seller.prototype, "rating", void 0);
Seller = __decorate([
    (0, typeorm_1.Entity)()
], Seller);
exports.default = Seller;
