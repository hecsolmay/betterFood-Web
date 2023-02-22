import React from "react";
import Dropdown from "./dropdown";
import "./topbar.css";
import { getUser } from "../../utils/localStorage";

const topbar = ({ showSideBar, setShowSideBar }) => {
  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const user = getUser();

  return (
    <>
      {" "}
      {/* <!-- Topbar --> */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* <!-- Sidebar Toggle (Topbar) --> */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={handleSideBar}
        >
          <i className="fa fa-bars"></i>
        </button>

        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item top-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {user.username}
              </span>
              <img
                className="img-profile rounded-circle"
                src={user.picture ? user.picture : "img/profile.jpg"}
              />
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <Dropdown />
          </li>
        </ul>
      </nav>
      {/* <!-- End of Topbar --> */}
    </>
  );
};

export default topbar;
