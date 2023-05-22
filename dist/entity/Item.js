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
const ItemType_1 = require("./ItemType");
const Rating_1 = require("./Rating");
let Item = class Item {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => ItemType_1.default, itemType => itemType.items),
    __metadata("design:type", ItemType_1.default)
], Item.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Catalogue_1.default, catalogue => catalogue.items),
    __metadata("design:type", Catalogue_1.default)
], Item.prototype, "catalogue", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Rating_1.default, rating => rating.item),
    __metadata("design:type", Array)
], Item.prototype, "ratings", void 0);
Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
exports.default = Item;
