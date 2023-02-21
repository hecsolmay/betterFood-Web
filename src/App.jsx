import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Categories from "./pages/categories";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./pages/forgotPassword";
import Ingredents from "./pages/ingredents";
import Login from "./pages/login";
import Notfound from "./pages/notFound";
import Produts from "./pages/products";
import Profile from "./pages/profile";
import Signup from "./pages/register";
import Reports from "./pages/reports";
import Roles from "./pages/roles";
import Sales from "./pages/sales";
import ShoppingList from "./pages/shoppingList";
import Waiters from "./pages/waiters";
import MainRoute from "./utils/mainRoute";
import ProtectedRoutes from "./utils/protectedRoutes";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainRoute />} />

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" index={true} element={<Dashboard />} />
          <Route path="/products" element={<Produts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/ingredents" element={<Ingredents />} />
          <Route path="/waiters" element={<Waiters />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="sales" element={<Sales />} />
          <Route path="sales/:id" element={<ShoppingList />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
