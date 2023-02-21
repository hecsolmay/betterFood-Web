import axios from "axios";
import { API_URL } from "../../config";
import { getTokenItem } from "../utils/localStorage";

const salesURL = `${API_URL}/sale/`;
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
