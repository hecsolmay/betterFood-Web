import axios from "axios";
import { getTokenItem } from "../utils/localStorage";
import { API_URL } from "../../config";
import { createAlert, updateAlert } from "../components/alerts";
import { getAlert } from "../utils/errorResponse";

const productURL = `${API_URL}/product/`;

export const getProducts = async (params) => {
  try {
    const res = params
      ? await axios.get(`${productURL}?${params}`)
      : await axios.get(productURL);
    return res;
  } catch (error) {
    const {response: res} = error
    console.error(res);
    return res
  }
};

export const createProduct = async (body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(productURL, body, config);
    await createAlert(body.name);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    getAlert(res.status, body.name, "un producto");
    return res;
  }
};

export const deleteProduct = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${productURL}${id}`, config);
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
    await updateAlert();
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    await getAlert(res.status, newProduct.name, "un producto");
    return res;
  }
};
