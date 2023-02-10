import axios from "axios";
import { getTokenItem } from "../utils/localStorage";

const categoriesURL = "http://localhost:3000/category/";
const config = {
  headers: { Authorization: `Bearer ${getTokenItem()}` },
};

export const getCategories = async ({ setCategories, setInfo }) => {
  try {
    const res = await axios.get(categoriesURL);

    const { data } = res;

    if(setInfo) setInfo(data.info);
    setCategories(data.results);
    return;
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const createCategory = async (body) => {
  try {
    const res = await axios.post(categoriesURL, body, config);
    console.log(res);

    if (res.status != 200) {
      setError("algo salio mal");
      return console.error("algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    console.log(id);
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
    const res = await axios.put(`${categoriesURL}${id}`, newCategory, config);
    console.log(res);
    return;
  } catch (error) {
    console.error(error);
  }
};
