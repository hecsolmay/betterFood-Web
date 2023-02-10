import axios from "axios";
import { getTokenItem } from "../utils/localStorage";
import { converDate } from "../utils";

const signInURL = "http://localhost:3000/auth/singin";
const signUpURL = "http://localhost:3000/auth/singup";
const usersURL = "http://localhost:3000/user";

const config = {
  headers: { Authorization: `Bearer ${getTokenItem()}` },
};


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

export const getUsers = async () => {
  try {
    const res = await axios.get(usersURL, config);
    return res;
  } catch (error) {
    const { response } = res;
    return;
  }
};

export const cleanUser = (user) => {
  const { _id, username, email, rol, createdAt } = user;

  const createDate = converDate(createdAt);

  return {
    id: _id,
    username,
    creado: createDate,
    email,
    rol: rol.name,
  };
};
