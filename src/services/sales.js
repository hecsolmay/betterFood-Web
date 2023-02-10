import axios from "axios";
import { converDate } from "../utils";
import { getTokenItem } from "../utils/localStorage";

const salesURL = "http://localhost:3000/sale/";
const config = {
  headers: { Authorization: `Bearer ${getTokenItem()}` },
};

export const getSales = async () => {
  try {
    const res = await axios.get(salesURL, config);
    return res;
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const cleanSale = (sale) => {
  const { _id, order, paid, moneyReceived = 0, createdAt, change = 0 } = sale;

  let createDate = converDate(createdAt);

  return {
    id: _id,
    orden: order._id,
    paid: paid,
    "dinero recibido": moneyReceived,
    cambio: change,
    creado: createDate,
  };
};
