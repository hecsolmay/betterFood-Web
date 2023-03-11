import React from "react";

function Table({ children }) {
  return (
    <div className="tab-content">
      <div className="tab-pane fade show active" role="tabpanel">
        <div className="app-card app-card-orders-table shadow-sm mb-5">
          <div className="app-card-body">
            <div className="table-responsive">
              <table className="table app-table-hover mb-0 text-left white">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
