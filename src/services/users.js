import axios from "axios";
import { API_URL } from "../../config";
import { createUserAlert, updateAlert } from "../components/alerts";
import { getAlert } from "../utils/errorResponse";
import { getTokenItem } from "../utils/localStorage";

const signInURL = `${API_URL}/auth/singin/`;
const signUpURL = `${API_URL}/auth/singup/`;
const usersURL = `${API_URL}/user`;
const rolesURL = `${API_URL}/role`;

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
    await createUserAlert();
    return res;
  } catch (err) {
    const { response } = err;
    return response;
  }
};

export const getRoles = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.get(rolesURL, config);
    const { data } = res;
    return data;
  } catch (err) {
    const { response } = err;
    return response;
  }
};

export const updateUser = async (id, userUpdate) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getTokenItem()}` },
    };
    const res = await axios.put(`${usersURL}/change/${id}`, userUpdate, config);
    await updateAlert();
    const { data } = res;
    return data;
  } catch (err) {
    const { response: res } = err;
    console.error(res);
    getAlert(res.status, userUpdate.username, "un usuario", "username");
    return res;
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
