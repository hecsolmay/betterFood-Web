import axios from "axios";
import { getTokenItem } from "../utils/localStorage";

const productURL = "http://localhost:3000/product/";
const config = {
  headers: { Authorization: `Bearer ${getTokenItem()}` },
};

export const getProducts = async ({ setProducts, setInfo }) => {
  try {
    const res = await axios.get(productURL);
    const { data } = res;
    setInfo(data.info);
    setProducts(data.results);
    return;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createProduct = async (body) => {
  try {
    const res = await axios.post(productURL, body, config);
    if (res.status != 200) {
      return console.error("algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${productURL}${id}`, config);
    if (res.status !== 200) {
      console.error("Algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
  }
};
