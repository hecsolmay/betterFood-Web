import React from "react";

const selectItems = ({ selectedValue, setSelectedValue }) => {
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

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
              defaultValue={selectedValue}
              onChange={handleChange}
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
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default selectItems;
