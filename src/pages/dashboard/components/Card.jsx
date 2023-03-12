import React from "react";

function Card({ image = null, title = "Product Card", size = "6", children }) {
  return (
    <div className={`col-lg-${size} mb-4`}>
      {/* <!-- Product Card --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
        </div>
        <div className="card-body">
          {image && (
            <div className="text-center">
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: "20rem", height: "15rem" }}
                src={image}
                alt="..."
              />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
