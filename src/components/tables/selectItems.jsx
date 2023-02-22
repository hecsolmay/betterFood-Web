import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const selectItems = ({ limit = 10 }) => {
  const [params, setParams] = useSearchParams();
  const handleChange = (e) => {
    e.preventDefault();
    params.set("limit", e.target.value);
    setParams(params);
  };

  const handleSearch = (ev) => {
    console.log(ev);
    params.set("q", ev.target.value);
    setParams(params);
  };

  const handleSearchEnter = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      console.log("Enter Pressed");
      console.log(ev.target.value);
      params.set("q", ev.target.value);
      setParams(params);
    }
  };

  const cleanSearch= () => {
    params.delete("q")
    setParams(params)
  }
  return (
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_length" id="dataTable_length">
          <label>
            Mostrar
            <select
              name="dataTable_length"
              aria-controls="dataTable"
              className="custom-select custom-select-sm form-control form-control-sm"
              onChange={handleChange}
              value={limit}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            Items
          </label>
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <div id="dataTable_filter" className="dataTables_filter">
          <label>
            Buscar:
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder=""
              aria-controls="dataTable"
              onKeyUp={handleSearchEnter}
            />
          </label>
          <button
            type="button"
            className="btn-sm btn-primary ms-2"
            onClick={handleSearch}
          >
            Buscar
          </button>
          {params.get("q") && (
            <div className="row mt-3 mb-3">
              <div className="col-sm-3">
                <p>{`Buscado: ${params.get("q")}`}</p>
              </div>
              <div className="col-sm-3">
                <button className="btn-sm btn-danger" onClick={cleanSearch}>Limpiar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default selectItems;
