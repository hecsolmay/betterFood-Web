import axios from "axios";
import { getTokenItem } from "../utils/localStorage";
import { API_URL } from "../../config";

const productURL = `${API_URL}/product/`;

export const getProducts = async (params) => {
  const res = params
    ? await axios.get(`${productURL}${params}`)
    : await axios.get(productURL);
  const { data } = res;
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

export const updateProduct = async ({ id, newProduct }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${productURL}${id}`, newProduct, config);
    console.log(res);
    return;
  } catch (error) {
    console.error(error);
  }
};
