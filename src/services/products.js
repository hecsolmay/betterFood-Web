import axios from "axios";
import { getTokenItem } from "../utils/localStorage";

const productURL = "http://localhost:3000/product/";

export const getProducts = async () => {
  const res = await axios.get(productURL);
  const { data } = res;
  // setInfo(data.info);
  // setProducts(data.results);
  return data;
};

export const createProduct = async (body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
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
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${productURL}${id}`, config);
    if (res.status !== 200) {
      console.error("Algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
  }
};
