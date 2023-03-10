import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Headers,
  ContainerAdmin,
  ContainerFluid,
  Row,
  Pagination,
} from "../../common";
import Table from "../../components/tables/table";
import * as services from "../../services/sales";
import "./index.css";

const OrdersPage = () => {
  const [sales, setSales] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  const getData = async () => {
    setLoading(true);

    const res = await services.getSales(params);
    console.log(res.data);
    if (res.status === 200) {
      const { data } = res;
      setSales(data.results);
      setInfo(data.info);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Orders" />
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <Filter />

            <NavTable />

            <div className="tab-content" id="orders-table-tab-content">
              <div
                className="tab-pane fade show active"
                id="orders-all"
                role="tabpanel"
                aria-labelledby="orders-all-tab"
              >
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table app-table-hover mb-0 text-left white">
                        <thead>
                          <tr>
                            <th className="cell">Orden</th>
                            <th className="cell">Mesero</th>
                            <th className="cell">N° Mesa</th>
                            <th className="cell">Fecha</th>
                            <th className="cell">Estatus</th>
                            <th className="cell">Total</th>
                            <th className="cell">Detalles</th>
                          </tr>
                        </thead>
                        {sales.length !== 0 && (
                          <tbody>
                            {sales.map((s) => (
                              <SaleRow sale={s} key={s.id} />
                            ))}
                            {/* <tr>
                            <td className="cell">#15346</td>
                            <td className="cell">John Sanders</td>
                            <td className="cell text-center">14</td>
                            <td className="cell">
                              <span>17 Oct</span>
                              <span className="ms-2">2:16 PM</span>
                            </td>
                            <td className="cell">
                              <span className="badge bg-success">Pagado</span>
                            </td>
                            <td className="cell">$259.35</td>
                            <td className="cell">
                              <a className="btn-sm app-btn-secondary" href="#">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="cell">#15346</td>
                            <td className="cell">John Sanders</td>
                            <td className="cell text-center">14</td>
                            <td className="cell">
                              <span>17 Oct</span>
                              <span className="ms-2">2:16 PM</span>
                            </td>
                            <td className="cell">
                              <span className="badge bg-danger">Cancelado</span>
                            </td>
                            <td className="cell">$259.35</td>
                            <td className="cell">
                              <a className="btn-sm app-btn-secondary" href="#">
                                View
                              </a>
                            </td>
                          </tr> */}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!loading && sales.length === 0 && (
              <div className="text-center mt-3 mb-5">
                <strong>AUN NO HAY VENTAS EL DIA DE HOY</strong>
              </div>
            )}
            <Pagination info={info} />
          </div>
        </div>
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default OrdersPage;

function SaleRow({ sale }) {
  const order = sale.order;
  const waiter = sale.order.waiterId;
  const table = sale.order.tableId;
  const time = convertDate(sale.createdAt);
  return (
    <tr>
      <td className="cell">{order.orderNumber}</td>
      <td className="cell">{`${waiter.name} ${waiter.lastName}`}</td>
      <td className="cell text-center">{table.numMesa}</td>
      <td className="cell">
        <span>{time}</span>
      </td>
      <td className="cell">
        <span className={sale.paid ? "badge bg-success" : "badge bg-warning"}>
          {sale.paid ? "Pagado" : "Pendiente"}
        </span>
      </td>
      <td className="cell">{`$${order.total.toFixed(2)}`}</td>
      <td className="cell">
        <Link className="btn-sm app-btn-secondary" to={`${sale.id}`}>
          View
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

function Filter() {
  const [params, setParams] = useSearchParams();

  const handleKeySearch = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      params.delete("date");
      params.delete("status");
      setParams(params);
      return;
    }
  };

  const handleSelect = (ev) => {
    params.delete("orderNumber");
    params.set("date", ev.target.value);
    setParams(params);
  };

  const handleSearch = () => {
    params.delete("date");
    params.delete("status");
    setParams(params);
  };

  const handleChange = (ev) => {
    params.set("orderNumber", ev.target.value);
  };

  return (
    <div className="row g-3 mb-4 align-items-center justify-space-between">
      <div className="col-auto">
        <div className="page-utilities">
          <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
            <div className="col-auto">
              <div className="row gx-1 align-items-center">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control search-orders"
                    placeholder="Buscan N° orden..."
                    onChange={handleChange}
                    onKeyUp={handleKeySearch}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={handleSearch}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
            {/* <!--//col--> */}
            <div className="col-auto">
              <select className="form-select w-auto" onChange={handleSelect}>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="period">Ultimos 3 meses</option>
                <option value="all">Todos</option>
              </select>
            </div>
            <div className="col-auto">
              {/* <button className="btn-sm btn-secondary">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-download me-2 mb-1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                  />
                </svg>
                Descargar CSV
              </button> */}
            </div>
          </div>
          {/* <!--//row--> */}
        </div>
        {/* <!--//table-utilities--> */}
      </div>
      {/* <!--//col-auto--> */}
    </div>
  );
}

function NavTable() {
  const [params, setParams] = useSearchParams();

  const handleSelect = (status) => {
    params.delete("orderNumber");
    params.set("status", status);
    setParams(params);
  };

  return (
    <nav
      id="orders-table-tab"
      className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
    >
      <button
        className="flex-sm-fill text-sm-center nav-link table-tab active"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("all")}
      >
        Todos
      </button>
      <button
        className="flex-sm-fill text-sm-center nav-link table-tab"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("paid")}
      >
        Pagados
      </button>
      <button
        className="flex-sm-fill text-sm-center nav-link table-tab"
        data-bs-toggle="tab"
        role="tab"
        onClick={() => handleSelect("pending")}
      >
        Pendientes
      </button>
    </nav>
  );
}
