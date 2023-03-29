import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeLocalItems } from "../../utils/localStorage";

const dropdown = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    removeLocalItems();
    navigate("/login")
  };

  return (
    <div
      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
      aria-labelledby="userDropdown"
    >
      <Link className="dropdown-item" to="/profile">
        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
        Perfil
      </Link>
      <div className="dropdown-divider"></div>
      <button className="dropdown-item" onClick={handleClick}>
        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
        Cerrar Sesion
      </button>
    </div>
  );
};

export default dropdown;
