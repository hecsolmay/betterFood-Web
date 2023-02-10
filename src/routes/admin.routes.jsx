import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import Categories from "../pages/categories";
import Reports from "../pages/reports";
import Sales from "../pages/sales";
import Produts from "../pages/products";
import Roles from "../pages/roles";
import Profile from "../pages/profile";

const routes = () => (
  <>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/products" element={<Produts />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/sales" element={<Sales />} />
    <Route path="/roles" element={<Roles />} />
    <Route path="/profile" element={<Profile />} />
  </>
);

export default routes;
