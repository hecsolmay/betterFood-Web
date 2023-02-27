import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const selectItems = ({
  limit = 10,
  search = true,
  placeholder = "buscar...",
}) => {
  const [params, setParams] = useSearchParams();
  const handleChange = (e) => {
    e.preventDefault();
    params.delete("page");
    params.set("limit", e.target.value);
    setParams(params);
  };

  const handleSearch = (ev) => {
    ev.preventDefault();
    let search = document.getElementById("search")
    params.set("q", search.value);
    setParams(params);
  };

  const handleSearchEnter = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      console.log(ev.target.value);
      params.set("q", ev.target.value);
      setParams(params);
    }
  };

  const cleanSearch = () => {
    params.delete("q");
    setParams(params);
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_length" id="dataTable_length">
            <label>
              Mostrar Items
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
            </label>
          </div>
        </div>
        {search && (
          <div className="col-sm-12 col-md-6">
            <div id="dataTable_filter" className="dataTables_filter">
              <label>
                Buscar:
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder={placeholder}
                  aria-controls="dataTable"
                  id="search"
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
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12">
          {params.get("q") && (
            <div className="row mt-3 mb-3">
              <div className="col-sm-3">
                <p>{`Buscado: ${params.get("q")}`}</p>
              </div>
              <div className="col-sm-3">
                <button className="btn-sm btn-danger" onClick={cleanSearch}>
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default selectItems;
