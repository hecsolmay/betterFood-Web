import axios from "axios";
import { API_URL } from "../../config";
import { getTokenItem } from "../utils/localStorage";

const tableURL = `${API_URL}/table/`;

export const getTables = async () => {
  const res = await axios.get(tableURL);
  const { data } = res;
  return data;
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
