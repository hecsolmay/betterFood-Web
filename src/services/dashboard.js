import { API_URL } from "../../config";
import axios from "axios";

const dashboardURL = `${API_URL}/dashboard`;

export const getDashboard = async (params) => {
  try {
    const res = await axios.get(dashboardURL);
    return res;
  } catch (error) {
    const { response: res } = error;
    console.error(res);
    return res;
  }
};
