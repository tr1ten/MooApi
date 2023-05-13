// This take user id as query parameter and returns the catalogue of all items  sharing same seller location as the user
// donot show those items which already have subscription by that user
import { Response } from "express";
import Catalogue from "../entity/Catalogue";
import Seller from "../entity/Seller";
import { ApiError } from "../error";
import { $Request } from "../type";
import Item from "../entity/Item";
import Subscription from "../entity/Subscription";
import { User } from "../entity/User";

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
export async function getNearBySellerItems(req: $Request, res: Response) {
  const { orm } = req.locals;
  const { userId, d } = req.query;
  const maxDistance:any = d || 50;
  if (!userId) throw ApiError.badRequest("Please provide valid details");
  const userRep = orm.getRepository(User);
  const user = await userRep.findOne({ where: { id: userId as any } });
  if (!user) throw ApiError.badRequest("No User found");
  const itemsRep = orm.getRepository(Item);
  const items = await itemsRep.find({
    relations: [
      "catalogue",
      "catalogue.seller",
      "type",
      "catalogue.seller.user",
    ],
  }); // TODO: add query to find items in same location
  const [lat, long] = user.location.split(",");
  const userSubs = await orm.getRepository(Subscription).find({
    where: {
      buyer: {
        userId: userId as any,
      },
    },
    relations: ["item", "item.catalogue", "item.catalogue.seller"],
  });
  // filter those seller who are more than maxDist km away

  const notSubItems = items.filter((item) => {
    let flag = true;
    const [lat2, long2] = item.catalogue.seller.user.location.split(",");
    const dist = getDistanceFromLatLonInKm(
        Number(lat),
        Number(long),
        Number(lat2),
        Number(long2)
    );
    if (dist > parseInt(maxDistance)) return false;
    userSubs.forEach((sub) => {
        if (sub.item.id === item.id) {
        flag = false;
      }
    });
    
    return flag;
  });
  return res.send(notSubItems);
}
