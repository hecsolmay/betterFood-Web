import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
    totalPages = 1,
    limit = 0,
    items = 0,
    currentPage = 0,
  } = info;

  const [params, setParams] = useSearchParams();

  console.log("parametros");
  console.log(params.toString());

  const handleNext = () => {
    params.set("page", currentPage + 1);
    setParams(params);
  };

  const handlePrevius = () => {
    params.set("page", currentPage - 1);
    setParams(params);
  };
  return (
    <Row>
      <div className="col-sm-12 col-md-4">
        <div
          className="dataTables_info ms-3"
          id="dataTable_info"
          role="status"
          aria-live="polite"
        >
          {limit * currentPage - limit} -
          {limit * currentPage > items ? items : limit * currentPage} de {items}
        </div>
      </div>
      <div className="col-sm-12 col-md-8">
        <div className="dataTables_paginate paging_simple_numbers">
          <ul className="pagination">
            {prev && (
              <li className="paginate_button page-item previous">
                <button
                  tabIndex={0}
                  className="page-link"
                  onClick={handlePrevius}
                >
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
              </li>
            )}

            <CreatePageNumber current={currentPage} total={totalPages} />
            {next && (
              <li className="paginate_button page-item next">
                <button tabIndex={0} className="page-link" onClick={handleNext}>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Row>
  );
};

const PageNumber = ({ number = 1, active = false, handleClick }) => (
  <li
    className={
      active ? "paginate_button page-item active" : "paginate_button page-item "
    }
  >
    <button
      tabIndex={0}
      className={active ? "page-link disabled" : "page-link"}
      onClick={handleClick}
    >
      {number}
    </button>
  </li>
);

const CreatePageNumber = ({ total = 1, current = 1 }) => {
  const numbers = [];
  const [params, setParams] = useSearchParams();

  const handleClick = (page = 1) => {
    params.set("page", page);
    setParams(params);
  };

  if (current > 3) {
    if (current + 2 <= total) {
      for (let i = current - 2; i <= current + 2; i++) {
        numbers.push({ number: i, active: i === current });
      }
    } else if (current + 1 == total) {
      for (let i = current - 3; i <= total; i++) {
        numbers.push({ number: i, active: i === current });
      }
    } else {
      for (let i = current - 4; i <= total; i++) {
        numbers.push({ number: i, active: i === current });
      }
    }
  } else {
    for (let i = 1; i <= total && i < 6; i++) {
      numbers.push({ number: i, active: i === current });
    }
  }

  console.log(numbers);
  return (
    <>
      {numbers.map((n) => (
        <PageNumber
          active={n.active}
          number={n.number}
          key={n.number}
          handleClick={() => handleClick(n.number)}
        />
      ))}
    </>
  );
};
