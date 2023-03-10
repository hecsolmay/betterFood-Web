import axios from "axios";
import { API_URL } from "../../config";
import {
  conflictError,
  createAlert,
  serverErrorAlert,
  updateAlert,
} from "../components/alerts";
import { getAlert } from "../utils/errorResponse";
import { getTokenItem } from "../utils/localStorage";

const categoriesURL = `${API_URL}/category`;

export const getCategories = async (params) => {
  const res = params
    ? await axios.get(`${categoriesURL}?${params}`)
    : await axios.get(categoriesURL);
  const { data } = res;
  return data;
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${categoriesURL}/all`);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    return res;
  }
};

export const createCategory = async (body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(categoriesURL, body, config);
    await createAlert(body.name);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    await getAlert(res.status, body.name, "una categoria");
    return res;
  }
};

export const deleteCategory = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${categoriesURL}/${id}`, config);
    console.log(res);

    return res;
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
    const res = await axios.put(`${categoriesURL}/${id}`, newCategory, config);
    await updateAlert();
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    await getAlert(res.status, newCategory.name, "una categoria");
    return res;
  }
};
