import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
function NavTable({ activeTab, setActiveTab }) {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get("status")) {
      setActiveTab(params.get("status"));
    } else {
      setActiveTab("all");
    }
  }, [params.get("status")]);

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
        className={`flex-sm-fill text-sm-center nav-link table-tab ${
          activeTab === "all" ? "active" : ""
        } `}
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("all")}
      >
        Todos
      </button>
      <button
        className={`flex-sm-fill text-sm-center nav-link table-tab ${
          activeTab === "pending" ? "active" : ""
        } `}
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("pending")}
      >
        Pendientes
      </button>
      <button
        className={`flex-sm-fill text-sm-center nav-link table-tab ${
          activeTab === "kitchen" ? "active" : ""
        } `}
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("kitchen")}
      >
        Cocina
      </button>
      <button
        className={`flex-sm-fill text-sm-center nav-link table-tab ${
          activeTab === "served" ? "active" : ""
        } `}
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("served")}
      >
        Servidos
      </button>

      <button
        className={`flex-sm-fill text-sm-center nav-link table-tab ${
          activeTab === "canceled" ? "active" : ""
        } `}
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
