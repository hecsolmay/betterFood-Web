import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PreviousPageContext } from "../../../context/PageContext";

const statusOptions = [
  {
    name: "pendiente",
    text: "Pendiente",
    className: "badge bg-warning",
    next: "fa-solid fa-kitchen-set cursor-pointer color-info",
    nextName: "cocinando",
  },
  {
    name: "cocinando",
    text: "Cocinando",
    className: "badge bg-info",
    next: "fa-solid fa-utensils cursor-pointer color-green",
    nextName: "servido",
  },
  { name: "servido", text: "Servido", className: "badge bg-success" },
  { name: "cancelado", text: "Cancelado", className: "badge bg-danger" },
];

function SaleRow({ sale, handleDelete, handleUpdate }) {
  const order = sale.order;
  let status = statusOptions.find((s) => s.name === order.status);

  order.staus === "";
  const waiter = sale.order.waiterId;
  const table = sale.order.tableId;
  const time = convertDate(sale.createdAt);
  const { setPreviousPage } = useContext(PreviousPageContext);
  return (
    <tr>
      <td className="cell">{order.orderNumber}</td>
      <td className="cell">{`${waiter.name} ${waiter.lastName}`}</td>
      <td className="cell text-center">{table.numMesa}</td>
      <td className="cell">
        <span>{time}</span>
      </td>
      <td className="cell">
        <span className={status.className}>{status.text}</span>
      </td>
      <td className="cell text-center">
        {status.name === "pendiente" && (
          <i
            className="fa-solid fa-trash cursor-pointer color-danger me-4"
            onClick={handleDelete}
            title="cancelar"
          />
        )}
        {status.next ? (
          <i
            className={status.next}
            title={status.nextName}
            onClick={() => handleUpdate(order.id,status.nextName)}
          />
        ) : null}
      </td>
      <td className="cell">{`$${order.total.toFixed(2)}`}</td>
      <td className="cell">
        <Link
          className="btn-sm app-btn-secondary"
          to={`${sale.id}`}
          onClick={() => {
            setPreviousPage("/orders");
          }}
        >
          Ver
        </Link>
      </td>
    </tr>
  );
}

function convertDate(IsoDate) {
  const fechaISO = IsoDate;
  const fecha = new Date(fechaISO);

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();
  const ampm = hora >= 12 ? "PM" : "AM";

  const horaFormateada = hora % 12 === 0 ? 12 : hora % 12;
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  const fechaFormateada = `${dia} ${mes}`;
  const horaYMinutosFormateados = `${horaFormateada}:${minutosFormateados} ${ampm}`;

  return `${fechaFormateada} ${horaYMinutosFormateados}`;
}

export default SaleRow;
