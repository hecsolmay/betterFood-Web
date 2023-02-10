import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getUser } from "../utils/localStorage";

const ProtectedRoutes = () => {
  let user = getUser();

  if (user)
    return user.rol.name === "admin" ? <Outlet /> : <Navigate to="/login" />;

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
