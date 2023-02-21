import React from "react";
import { Row } from "../common";

const Col = ({ colSize = "col-lg-8", children}) => {
  return (
    <div className={colSize + " mb-4"}>
      {/* <!-- Product Card --> */}
      <div className="card shadow mb-4">
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Col;
