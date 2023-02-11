import React, { useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";

export const Headers = ({ title = "" }) => {
  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">{title}</h1>
    </div>
  );
};

export const ButtonModal = ({ title = "" }) => (
  <button
    data-bs-toggle="modal"
    data-bs-target="#Modal"
    className="btn btn-sm btn-primary shadow-sm mb-4"
  >
    {title}
  </button>
);

export const Loader = () => (
  <div className="text-center">
    <img src="img/loading.gif" className="loader" />
  </div>
);

export const ContainerAdmin = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setShowSideBar(true);
    }

    if (window.innerWidth < 768) {
      setShowSideBar(false);
    }
  });
  return (
    <div className="App" id="wrapper">
      <Sidebar showSideBar={showSideBar} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        {children}
      </div>
    </div>
  );
};

export const Row = ({ children }) => <div className="row">{children}</div>;

export const ContainerFluid = ({ children }) => (
  <div className="container-fluid">{children}</div>
);

export const Pagination = ({ info }) => {
  const {
    prev = false,
    next = false,
    total = 1,
    count = 0,
    current = 0,
    select = 10,
  } = info;
  let showing = 10;
  if (count < 10) showing = count;
  return (
    <Row>
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info"
          id="dataTable_info"
          role="status"
          aria-live="polite"
        >
          Mostrando {count < select ? count : select} de {count}
        </div>
      </div>
      <div className="col-sm-12 col-md-7">
        <div className="dataTables_paginate paging_simple_numbers">
          <ul className="pagination">
            {prev && (
              <li className="paginate_button page-item previous">
                <button tabIndex={0} className="page-link">
                  Previous
                </button>
              </li>
            )}

            {/* {createPageNumber({ total: total, current: current })} */}
            {/* <li className="paginate_button page-item active">
              <button tabIndex={0} className="page-link">
                1
              </button>
            </li>
            <li className="paginate_button page-item ">
              <button tabIndex={0} className="page-link">
                2
              </button>
            </li> */}
            {next && (
              <li className="paginate_button page-item next">
                <button tabIndex={0} className="page-link">
                  Next
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Row>
  );
};

const PageNumber = ({ number, key, active = false }) => (
  <li
    className={
      active ? "paginate_button page-item active" : "paginate_button page-item "
    }
    key={key}
  >
    <button tabIndex={0} className="page-link">
      {number}
    </button>
  </li>
);

const createPageNumber = ({ total, current }) => {
  const numbers = [];
  if (total < 6) {
    for (let i = 1; i <= total; i++) {
      if (i === current) {
        numbers.push({ number: i, key: i, active: true });
        return;
      }

      numbers.push({ number: i, key: i, active: false });
    }
  }
  console.log(numbers);
  return (
    <>
      {numbers.map((n) => {
        console.log(n);
        return PageNumber({ key: n.key, number: n.number, active: n.active });
      })}
    </>
  );
};
