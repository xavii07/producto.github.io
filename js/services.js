import { push, ref, remove, set } from "firebase/database";
import { db } from "./config";

export const createProduct = (product) => {
  try {
    push(ref(db, "Gaspata_Xavier"), product);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateProduct = (key, newProduct) => {
  set(ref(db, `Gaspata_Xavier/${key}`), newProduct);
};

export const deleteProduct = (productKey) => {
  try {
    remove(ref(db, `Gaspata_Xavier/${productKey}`));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
