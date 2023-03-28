// return all item types available

import { Response } from "express";
import ItemType from "../entity/ItemType";
import { $Request } from "../type";

export async function getItemTypes(req: $Request, res: Response) {
    const {orm} = req.locals;
    const itemRep = orm.getRepository(ItemType);
    const itemTypes = await itemRep.find();
    return res.send(itemTypes);
}