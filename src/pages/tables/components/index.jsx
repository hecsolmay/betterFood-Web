import React from "react";
import Col from "../../../components/col-xl-3";

export const TableCard = ({ handleUpdate, data }) => {
  return (
    <Col colSize="col-lg-6" className="text-center">
      <div className="hover-card" onClick={handleUpdate}>
        <h3>Numero Mesa {data.numMesa}</h3>
        <div className="table-image mt-4">
          <img src="img/restauran-table.jpg" />
        </div>
        <h4 className="mt-4">{`Tamaño ${data.capacity} personas`}</h4>
        {/* <h5 className="mt-4">Asignado a Juan</h5> */}
        <h5 className="mt-4">{`Activo: ${data.active == 1 ? "Si" : "No"}`}</h5>
      </div>
    </Col>
  );
};
