import axios from "axios";
import { getTokenItem } from "../utils/localStorage";

const categoriesURL = "http://localhost:3000/category/";


export const getCategories = async () => {
  const res = await axios.get(categoriesURL);

  const { data } = res;

  // if(setInfo) setInfo(data.info);
  // setCategories(data.results);
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
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
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
