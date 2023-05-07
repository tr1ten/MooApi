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
      image: "https://static9.depositphotos.com/1671840/1150/i/450/depositphotos_11504909-stock-photo-cow-isolated.jpg"
    },
    {
      label: "Buffalo Milk",
      description: "Milk fetched from buffalo",
      image: "https://media.istockphoto.com/id/1060986360/photo/the-wild-water-buffalo-with-white-egret.jpg?s=612x612&w=0&k=20&c=CV6PQBwSor5sy1LtIQMHBUBMVUbG0bR2hnYfJ_rFakI="
    },
    {
      label: "Goat Milk",
      description: "Milk fetched from goat",
      image:"https://backyardgoats.iamcountryside.com/wp-content/uploads/sites/2/2019/03/shutterstock_414901216-e1536954249170.jpg"
      
    },
    {
      label: "Eggs",
      description: "Eggs fetched from chicken",
      image:"https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg"
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
