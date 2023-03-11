import React from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [params, setParams] = useSearchParams();

  const handleChange = (ev) => {
    params.set(ev.target.name, ev.target.value);
    setParams(params);
  };
  return (
    <div className="row mb-2">
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_length">
          <label>
            Mostrar Items
            <select
              name="limit"
              aria-controls="dataTable"
              className="custom-select custom-select-sm form-control form-control-sm mt-2"
              onChange={handleChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <label>Fecha de reporte</label>
        <input
          placeholder="selecciona tu fecha"
          name="date"
          type="date"
          onChange={handleChange}
          className="form-control"
        />
      </div>
    </div>
  );
}

export default Filter;
