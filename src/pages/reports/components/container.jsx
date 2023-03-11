import React from "react";

function Container({ children }) {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Reportes</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="row mt-3">{children}</div>
          </div>
        </div>
      </div>
    );
  }
export default Container;
