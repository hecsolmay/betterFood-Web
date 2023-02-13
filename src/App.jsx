import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Categories from "./pages/categories";
import Reports from "./pages/reports";
import Sales from "./pages/sales";
import Notfound from "./pages/notFound";
import Produts from "./pages/products";
import Roles from "./pages/roles";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Signup from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import ProtectedRoutes from "./utils/protectedRoutes";
import ShoppingList from "./pages/shoppingList";
import MainRoute from "./utils/mainRoute";


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
