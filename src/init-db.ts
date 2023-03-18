import { AppDataSource } from "./db";
import ItemType from "./entity/ItemType";
import { UserType } from "./entity/UserType";
const addUserTypes = async () => {
  const utrep = AppDataSource.getRepository(UserType);
  const usertypes: Partial<UserType>[] = [
    {
      label: "Seller",
    },
    {
      label: "Buyer",
    },
  ];
  return utrep.save(usertypes);
};

const addItemTypes = async () => {
  const utrep = AppDataSource.getRepository(ItemType);
  const usertypes: Partial<ItemType>[] = [
    {
      label: "Cow Milk",
      description: "Milk fetched from cow",
    },
  ];
  return utrep.save(usertypes);
};

AppDataSource.initialize()
  .then(() => {
    Promise.all([addItemTypes(), addUserTypes()])
      .then(() => {
        console.log("Successfully added all data");
        AppDataSource.destroy();
      })
      .catch((e) => {
        console.log("error occured while adding ", e);
      });
  })
  .catch((e) => {
    console.log("error initializing ", e);
  });
