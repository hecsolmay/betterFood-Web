import axios from "axios";
import { API_URL } from "../../config";
import { getTokenItem } from "../utils/localStorage";

const ingredentsURL = `${API_URL}/ingredent/`;

export const getIngredents = async (params) => {
  const res = params
    ? await axios.get(`${ingredentsURL}${params}`)
    : await axios.get(ingredentsURL);
  const { data } = res;
  return data;
};

export const createIngredent = async (body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(ingredentsURL, body, config);
    console.log(res);

    if (res.status != 200) {
      return console.error("algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const deleteIngredent = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${ingredentsURL}${id}`, config);
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

export const updateIngredent = async ({ id, newIngredent }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${ingredentsURL}${id}`, newIngredent, config);
    console.log(res);
    return;
  } catch (error) {
    console.error(error);
  }
};
