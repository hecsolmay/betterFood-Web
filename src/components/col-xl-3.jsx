import React from "react";
import { Row } from "../common";

const Col = ({ colSize = "col-lg-8", className = "", children }) => {
  return (
    <div className={colSize + " mb-4"}>
      {/* <!-- Product Card --> */}
      <div className="card shadow mb-4">
        <div className={"card-body" + ` ${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default Col;
