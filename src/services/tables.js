import axios from "axios";
import { API_URL } from "../../config";
import { getTokenItem } from "../utils/localStorage";
import { generateQr } from "../utils/qrgenerate";

const tableURL = `${API_URL}/table`;

export const getTables = async (params) => {
  const res = params
    ? await axios.get(`${tableURL}?${params}`)
    : await axios.get(tableURL);
  const { data } = res;
  return data;
};

export const generateListQr = async () => {
  try {
    const res = await axios.get(`${tableURL}/qr`, {
      responseType: "blob",
    });

    generateQr(res);
  } catch (error) {
    console.error(error);
  }
};

export const generateAllQr = async () => {
  try {
    const res = await axios.get(`${tableURL}/all/qr`, {
      responseType: "blob",
    });
    generateQr(res);
  } catch (error) {
    console.error(error);
  }
};

export const generateQrById = async (id) => {
  try {
    const res = await axios.get(`${tableURL}/${id}/qr`, {
      responseType: "blob",
    });

    generateQr(res);
  } catch (error) {
    console.error(error);
  }
};

export const createTable = async (newTable) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(`${tableURL}`, newTable, config);
  } catch (error) {
    console.error(error);
  }
};

export const updateTable = async (id, newTable) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${tableURL}/${id}`, newTable, config);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
