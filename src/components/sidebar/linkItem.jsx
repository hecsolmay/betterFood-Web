import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const linkItem = ({ path, icon, text }) => (
  <li className="nav-item">
    <NavLink className="nav-link" to={path}>
      <i className={icon}></i>
      <span className="ml-2">{text}</span>
    </NavLink>
  </li>
);

export default linkItem;
