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
      image: "https://cdn-icons-png.flaticon.com/256/1998/1998610.png"
    },
    {
      label: "Buffalo Milk",
      description: "Milk fetched from buffalo",
      image: "https://cdn-icons-png.flaticon.com/512/1702/1702816.png"
    },
    {
      label: "Goat Milk",
      description: "Milk fetched from goat",
      image:"https://cdn-icons-png.flaticon.com/512/1998/1998662.png"
      
    },
    {
      label: "Eggs",
      description: "Eggs fetched from chicken",
      image:"https://cdn-icons-png.flaticon.com/256/2713/2713474.png"
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
