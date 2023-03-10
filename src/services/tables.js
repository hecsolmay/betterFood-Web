import axios from "axios";
import { API_URL } from "../../config";
import { createAlert, updateAlert } from "../components/alerts";
import { getAlert } from "../utils/errorResponse";
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
    const { response: res } = error;
    console.error(error);
    await getAlert(res.status);
    return res;
  }
};

export const generateAllQr = async () => {
  try {
    const res = await axios.get(`${tableURL}/all/qr`, {
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
    const res = await axios.get(`${tableURL}/${id}/qr`, {
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

export const createTable = async (newTable) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.post(`${tableURL}`, newTable, config);
    await createAlert(`Mesa ${newTable.numMesa}`);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    await getAlert(
      res.status,
      `Mesa ${newTable.numMesa}`,
      "una mesa",
      "numero"
    );
    return res;
  }
};

export const updateTable = async (id, newTable) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${tableURL}/${id}`, newTable, config);
    await updateAlert();
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    await getAlert(
      res.status,
      `Mesa ${newTable.numMesa}`,
      "una mesa",
      "numero"
    );
  }
};
