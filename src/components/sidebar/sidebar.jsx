import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import LinkItem from "./linkItem";

const sidebar = ({ showSideBar }) => {
  return (
    <ul
      className={
        showSideBar
          ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion collapse"
      }
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}

      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/dashboard"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Better Food</div>
      </Link>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-3" />

      {/* <!-- Nav Items --> */}
      {routes.map(({ text, icon, path }, index) => (
        <LinkItem key={index} path={path} icon={icon} text={text} />
      ))}

      {/*  <!-- Divider --> */}
      <hr className="sidebar-divider" />
    </ul>
  );
};

export default sidebar;
