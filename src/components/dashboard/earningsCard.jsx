import React from "react";

const earningsCard = ({
  title,
  quantity,
  icon = "fas fa-dollar-sign fa-2x text-gray-300",
  color = "primary",
}) => (
  <div className="col-xl-3 col-md-6 mb-4">
    <div className={"card border-left-" + color + " shadow h-100 py-2"}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
              {title}
            </div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              {quantity}
            </div>
          </div>
          <div className="col-auto">
            <i className={icon}></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default earningsCard;
