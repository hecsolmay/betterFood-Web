import React, { useState } from "react";
import SelectItems from "./selectItems";
import { Pagination, Row } from "../../common";
import Button from "./buttons";

const defaultHandle = () => alert("Button Pressed");

const table = ({ children, info = {}, title = "" }) => {
  const [selectedValue, setSelectedValue] = useState(10);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div
            className="dataTables_wrapper dt-bootstrap4"
            id="dataTable_wrapper"
          >
            <SelectItems
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
            />

            <div className="row">
              <div className="col-sm-12">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing={"0"}
                >
                  {children}
                </table>
              </div>
            </div>

            <Pagination select={selectedValue} info={info ? info : null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default table;
