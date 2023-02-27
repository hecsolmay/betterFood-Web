import axios from "axios";
import { API_URL } from "../../config";
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
    console.log(res);

    if (res.status != 200) {
      return console.error("algo salio mal");
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const generateListQr = async () => {
  try {
    const res = await axios.get(`${waitersURL}/qr`, {
      responseType: "blob",
    });

    generateQr(res);
  } catch (error) {
    console.error(error);
  }
};

export const generateAllQr = async () => {
  try {
    const res = await axios.get(`${waitersURL}/all/qr`, {
      responseType: "blob",
    });

    generateQr(res);
  } catch (error) {
    console.error(error);
  }
};

export const generateQrById = async (id) => {
  try {
    const res = await axios.get(`${waitersURL}/${id}/qr`, {
      responseType: "blob",
    });

    generateQr(res);
  } catch (error) {
    console.error(error);
  }
};

export const deleteWaiter = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.delete(`${waitersURL}/${id}`, config);
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

export const updateWaiter = async ({ id, newWaiter }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${waitersURL}/${id}`, newWaiter, config);
    console.log(res);
    return;
  } catch (error) {
    console.error(error);
  }
};
