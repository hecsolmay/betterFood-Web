import React from "react";
import Col from "../../../components/col-xl-3";

export const TableCard = ({
  handleUpdate,
  data,
  handleDownloadId,
  handleDelete,
}) => {
  return (
    <Col colSize="col-lg-6" className="text-center">
      <div className="hover-card" onClick={handleUpdate}>
        <h3> Mesa {data.numMesa}</h3>
        <div className="table-image mt-4">
          <img src="img/restauran-table.jpg" />
        </div>
        <h4 className="mt-4">{`Tamaño ${data.capacity} personas`}</h4>
        <h5 className="mt-4">{`Activo: ${data.active == 1 ? "Si" : "No"}`}</h5>
      </div>
      <button
        className={
          data.active == 1
            ? "btn btn-small btn-dark mt-3"
            : "btn btn-small btn-dark mt-3 disabled"
        }
        onClick={handleDownloadId}
      >
        <i className="fa-solid fa-qrcode"></i>
      </button>
      <button
        className={
          data.active == 1
            ? "btn btn-small btn-danger mt-3 ms-3"
            : "btn btn-small btn-success mt-3 ms-3 "
        }
        onClick={handleDelete}
      >
        <i className={data.active == 1 ? "fa-solid fa-trash" : "fa fa-arrows-rotate"} />
      </button>
    </Col>
  );
};
