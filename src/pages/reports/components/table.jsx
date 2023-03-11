import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PreviousPageContext } from "../../../context/PageContext";

export function Table({ children }) {
  return (
    <div className="col-sm-12">
      <table
        className="table table-bordered"
        id="dataTable"
        width="100%"
        cellSpacing={"0"}
      >
        {children}
      </table>
    </div>
  );
}

export function Thead() {
  return (
    <thead>
      <tr>
        <th># Orden</th>
        <th># Mesa</th>
        <th>Mesero</th>
        <th>Fecha de Venta</th>
        <th>Productos Comprados</th>
        <th>Status</th>
        <th>Total</th>
        <th>Dinero Recibido</th>
        <th>Cambio</th>
        <th>Detalles</th>
      </tr>
    </thead>
  );
}

export function Td({ sale, orderId }) {
  const statusOptions = [
    { name: "pendiente", text: "Pendiente", className: "badge bg-warning" },
    { name: "cocinando", text: "Cocinando", className: "badge bg-info" },
    { name: "servido", text: "Servido", className: "badge bg-success" },
  ];
  const { order } = sale;
  let status = { className: "badge bg-warning", text: "Pendiente" };

  if (sale.paid) {
    status.className = "badge bg-success";
    status.text = "Pagado";
  }

  if (sale.canceled) {
    status.className = "badge bg-danger";
    status.text = "Cancelado";
  }
  const { setPreviousPage } = useContext(PreviousPageContext);
  return (
    <tr>
      <td>{`${order.orderNumber}`}</td>
      <td>{`${order.tableId.numMesa}`}</td>
      <td>{`${order.waiterId.name} ${order.waiterId.lastName}`}</td>
      <td>{`2 Mar 5:05 PM`}</td>
      <td>{`${order.totalQuantity}`}</td>
      <td>
        <span className={status.className}>{status.text}</span>
      </td>
      <td>{`$${order.total}`}</td>
      <td>{`$${sale.moneyReceived}`}</td>
      <td>{`$${sale.change}`}</td>
      <td className="text-center">
        <Link
          to={`/orders/${orderId}`}
          onClick={() => {
            setPreviousPage("/reports");
          }}
        >
          <i
            title="ver detalles"
            className="fa-solid fa-eye cursor-pointer color-detail"
          />
        </Link>
      </td>
    </tr>
  );
}
