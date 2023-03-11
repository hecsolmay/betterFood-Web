import axios from "axios";
import { API_URL } from "../../config";
import {
  deleteAlertOrder,
  updateAlertOrder,
  updateAlertSale,
} from "../components/alerts";
import { getAlert } from "../utils/errorResponse";
import { getTokenItem } from "../utils/localStorage";

const salesURL = `${API_URL}/sale`;
const orderURL = `${API_URL}/order`;

export const getSales = async (params) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.get(`${salesURL}?${params}`, config);
    return res;
  } catch (error) {
    const { response: res } = error;
    return res;
  }
};

export const getReports = async (params) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.get(`${salesURL}/reports?${params}`, config);
    return res;
  } catch (error) {
    const { response: res } = error;
    return res;
  }
};

export const getSaleById = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.get(`${salesURL}/${id}`, config);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(error);
    return res;
  }
};

export const updateSale = async (id, body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${salesURL}/${id}`, body, config);
    await updateAlertSale();
    return res;
  } catch (error) {
    const { response: res } = error;
    await getAlert(res.status, "numero de orden", "una orden");
    return res;
  }
};

export const updateOrder = async (id, body) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${orderURL}/${id}`, body, config);
    if (body?.status === "cancelado") {
      await deleteAlertOrder();
    } else {
      await updateAlertOrder();
    }
    return res;
  } catch (error) {
    const { response: res } = error;
    await getAlert(res.status, "numero de orden", "una orden");
    return res;
  }
};

