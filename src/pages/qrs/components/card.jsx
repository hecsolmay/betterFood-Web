import React from "react";

const Card = ({
  size = "4",
  title = "",
  handleClick = () => {},
  image = "img/waiterProfile.png",
  children,
}) => {
  return (
    <div className={`col-lg-${size} mb-4 cursor-pointer`} onClick={handleClick}>
      {/* <!-- Product Card --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold ">{title}</h6>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "15rem", height: "10rem" }}
              src={image}
              alt="..."
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
