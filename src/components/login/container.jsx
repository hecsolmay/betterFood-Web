import React from "react";

const Container = ({ children }) => {
  return (
    <div className="bg-login" style={{minHeight: "100vh", paddingTop: "30px"}}>
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
