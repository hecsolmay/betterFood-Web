export const getTokenItem = () => {
  let stringToken = window.localStorage.getItem("jwtoken");
  let jsonToken = JSON.parse(stringToken);
  return jsonToken;
};

export const getUser = () => {
  let stringToken = window.localStorage.getItem("user");
  let jsonUser = JSON.parse(stringToken);
  return jsonUser;
};

export const setItems = ({ user, token }) => {
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("jwtoken", JSON.stringify(token));
};

export const removeLocalItems = () => {
  window.localStorage.removeItem("user")
  window.localStorage.removeItem("jwtoken")
}