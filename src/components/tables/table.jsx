import React, { useState } from "react";
import SelectItems from "./selectItems";
import { Pagination, Row } from "../../common";
import { useSearchParams } from "react-router-dom";
import Button from "./buttons";

const table = ({ children, info = {}, title = "", placeholder }) => {
  const [params] = useSearchParams();

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <SelectItems limit={info.limit} placeholder={placeholder} />

          <div className="row mt-3">
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

            <Pagination info={info ? info : null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default table;
