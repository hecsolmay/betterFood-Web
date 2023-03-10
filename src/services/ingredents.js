import axios from "axios";
import { API_URL } from "../../config";
import { createAlert, updateAlert } from "../components/alerts";
import { getAlert } from "../utils/errorResponse";
import { getTokenItem } from "../utils/localStorage";

const ingredentsURL = `${API_URL}/ingredent`;

export const getIngredents = async (params) => {
  const res = params
    ? await axios.get(`${ingredentsURL}?${params}`)
    : await axios.get(ingredentsURL);
  const { data } = res;
  return data;
};

export const getAllIngredents = async () => {
  try {
    const res = await axios.get(`${ingredentsURL}/all`);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    return res;
  }
};

export const createIngredent = async (body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(ingredentsURL, body, config);
    await createAlert(body.name);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    await getAlert(res.status, body.name, "un ingrediente");
    return res;
  }
};

export const deleteIngredent = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${ingredentsURL}/${id}`, config);
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
    const res = await axios.put(`${ingredentsURL}/${id}`, newIngredent, config);
    await updateAlert();
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    await getAlert(res.status, newIngredent.name, "un ingrediente");
    return res;
  }
};
