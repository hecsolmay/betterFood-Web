import React from "react";
import { useSearchParams } from "react-router-dom";

function Filter({ selected, setSelected }) {
  const [params, setParams] = useSearchParams();

  const handleKeySearch = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      params.delete("date");
      params.delete("status");
      setParams(params);
      return;
    }
  };

  const handleSelect = (ev) => {
    params.delete("orderNumber");
    params.set("date", ev.target.value);
    setParams(params);
    setSelected(ev.target.value);
  };

  const handleSearch = () => {
    params.delete("date");
    params.delete("status");
    setParams(params);
  };

  const handleChange = (ev) => {
    params.set("orderNumber", ev.target.value);
  };

  return (
    <div className="row g-3 mb-4 align-items-center justify-space-between">
      <div className="col-auto">
        <div className="page-utilities">
          <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
            <div className="col-auto">
              <div className="row gx-1 align-items-center">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control search-orders"
                    placeholder="Buscan N° orden..."
                    onChange={handleChange}
                    onKeyUp={handleKeySearch}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={handleSearch}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
            {/* <!--//col--> */}
            <div className="col-auto">
              <select
                className="form-select w-auto"
                onChange={handleSelect}
                value={selected}
              >
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="period">Ultimos 3 meses</option>
                <option value="all">Todos</option>
              </select>
            </div>
            <div className="col-auto">
              {/* <button className="btn-sm btn-secondary">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-download me-2 mb-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                    />
                  </svg>
                  Descargar CSV
                </button> */}
            </div>
          </div>
          {/* <!--//row--> */}
        </div>
        {/* <!--//table-utilities--> */}
      </div>
      {/* <!--//col-auto--> */}
    </div>
  );
}

export default Filter;
