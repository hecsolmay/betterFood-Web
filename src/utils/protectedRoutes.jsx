import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getUser, getExpire, removeLocalItems } from "../utils/localStorage";

const ProtectedRoutes = () => {
  let expire = getExpire();
  let user = getUser();

  if (user) {
    console.log(expire);
    console.log("Datos");
    if (Math.floor(Date.now() / 1000) > expire) {
      console.log("Expiro");
      removeLocalItems();
      return <Navigate to="/login" />;
    }
    return user.rol.name === "admin" ? <Outlet /> : <Navigate to="/login" />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
