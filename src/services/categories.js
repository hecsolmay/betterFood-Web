import axios from "axios";
import { API_URL } from "../../config";
import { getTokenItem } from "../utils/localStorage";

const categoriesURL = `${API_URL}/category/`;

export const getCategories = async (params) => {
  const res = params
    ? await axios.get(`${categoriesURL}?${params}`)
    : await axios.get(categoriesURL);
  const { data } = res;
  return data;
};

export const getAllCategories = async () => {
  const res = await axios.get(`${categoriesURL}all`);
  const { data } = res;
  return data;
};

export const createCategory = async (body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(categoriesURL, body, config);
    console.log(res);

    if (res.status != 200) {
      return console.error("algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${categoriesURL}${id}`, config);
    console.log(res);

    if (res.status != 200) {
      return console.error("algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const updateCategory = async ({ id, newCategory }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${categoriesURL}${id}`, newCategory, config);
    console.log(res);
    return;
  } catch (error) {
    console.error(error);
  }
};
