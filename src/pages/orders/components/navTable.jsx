import React from "react";
import { useSearchParams } from "react-router-dom";
function NavTable() {
  const [params, setParams] = useSearchParams();

  const handleSelect = (status) => {
    params.delete("orderNumber");
    params.set("status", status);
    setParams(params);
  };

  return (
    <nav
      id="orders-table-tab"
      className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
    >
      <button
        className="flex-sm-fill text-sm-center nav-link table-tab active"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("all")}
      >
        Todos
      </button>
      <button
        className="flex-sm-fill text-sm-center nav-link table-tab"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("pending")}
      >
        Pendientes
      </button>
      <button
        className="flex-sm-fill text-sm-center nav-link table-tab"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("kitchen")}
      >
        Cocina
      </button>
      <button
        className="flex-sm-fill text-sm-center nav-link table-tab"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("served")}
      >
        Servidos
      </button>

      <button
        className="flex-sm-fill text-sm-center nav-link table-tab"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("canceled")}
      >
        Cancelados
      </button>
    </nav>
  );
}

export default NavTable;
