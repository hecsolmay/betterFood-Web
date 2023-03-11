import axios from "axios";
import { API_URL } from "../../config";
import { createAlert, updateAlert } from "../components/alerts";
import { getAlert } from "../utils/errorResponse";
import { getTokenItem } from "../utils/localStorage";
import { generateQr } from "../utils/qrgenerate";

const waitersURL = `${API_URL}/waiter`;

export const getWaiters = async (params) => {
  const res = params
    ? await axios.get(`${waitersURL}?${params}`)
    : await axios.get(waitersURL);
  const { data } = res;
  return data;
};

export const createWaiter = async (body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(waitersURL, body, config);
    await createAlert(body.name);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    await getAlert(res.status, body.name, "un mesero");
  }
};

export const generateListQr = async () => {
  try {
    const res = await axios.get(`${waitersURL}/qr`, {
      responseType: "blob",
    });
    generateQr(res);
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    await getAlert(res.status);
    return res;
  }
};

export const generateAllQr = async () => {
  try {
    const res = await axios.get(`${waitersURL}/all/qr`, {
      responseType: "blob",
    });

    generateQr(res);
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    await getAlert(res.status);
    return res;
  }
};

export const generateQrById = async (id) => {
  try {
    const res = await axios.get(`${waitersURL}/${id}/qr`, {
      responseType: "blob",
    });

    generateQr(res);
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    await getAlert(res.status);
    return res;
  }
};

export const deleteWaiter = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${waitersURL}/${id}`, config);

    if (res.status != 200) {
      return console.error("algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const updateWaiter = async ({ id, newWaiter }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${waitersURL}/${id}`, newWaiter, config);
    await updateAlert();
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    await getAlert(res.status, newWaiter.name, "un mesero");
  }
};
