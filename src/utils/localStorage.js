export const getTokenItem = () => {
  let stringToken = window.localStorage.getItem("jwtoken");
  let jsonToken = JSON.parse(stringToken);
  return jsonToken;
};

export const getUser = () => {
  let stringUser = window.localStorage.getItem("user");
  let jsonUser = JSON.parse(stringUser);
  return jsonUser;
};

export const getExpire = () => {
  let stringExpire = window.localStorage.getItem("expiresAt");
  let expires = JSON.parse(stringExpire);
  return expires;
};

export const setItems = ({ user, token, expiresAt }) => {
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("jwtoken", JSON.stringify(token));
  window.localStorage.setItem("expiresAt", JSON.stringify(expiresAt));
};

export const removeLocalItems = () => {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("jwtoken");
  window.localStorage.removeItem("expiresAt");
};
