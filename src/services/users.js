import axios from "axios";
import { API_URL } from "../../config";
import { getTokenItem } from "../utils/localStorage";

const signInURL = `${API_URL}/auth/singin/`;
const signUpURL = `${API_URL}/auth/singup/`;
const usersURL = `${API_URL}/user`;

export const singin = async (userData) => {
  try {
    const res = await axios.post(signInURL, userData);
    return res;
  } catch (err) {
    const { response } = err;
    return response;
  }
};

export const signup = async (user) => {
  try {
    const res = await axios.post(signUpURL, user);
    return res;
  } catch (err) {
    const { response } = err;
    return response;
  }
};

export const getUsers = async (params) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };

    const res = params
      ? await axios.get(`${usersURL}?${params}`, config)
      : await axios.get(usersURL, config);

    const { data } = res;
    return data;
  } catch (error) {
    console.error(error);
  }
};
