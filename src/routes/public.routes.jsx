import React from "react";
import { Route } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/register";
import ForgotPassword from "../pages/forgotPassword";

const routes = () => (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  </>
);

export default routes;
