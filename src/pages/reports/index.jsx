import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Headers,
  ContainerAdmin,
  ContainerFluid,
  Row,
  Loader,
  Pagination,
} from "../../common";
import { getReports } from "../../services/sales";

const reports = () => {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reports, setReports] = useState([]);
  const [info, setInfo] = useState({});

  const getData = async () => {
    setLoading(true);
    const res = await getReports(params.toString());
    console.log(res);
    setLoading(false);
    if (res.status === 200) {
      const { data } = res;
      console.log(data.results);
      setReports(data.results);
      setInfo(data.info);
    } else {
      setError(true);
    }
  };

  const handleDetail = (id) => {
    console.log(`Detalles de la venta ${id}`);
  };

  useEffect(() => {
    getData();
  }, [params]);

  const handleQuery = (ev) => {
    params.set(ev.target.name, ev.target.value);
    setParams(params);
  };
  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Reports" />
        {loading ? (
          <Loader />
        ) : (
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Reportes</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <Filter handleChange={handleQuery} />

                <div className="row mt-3">
                  <div className="col-sm-12">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={"0"}
                    >
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
                      {reports.length !== 0 && (
                        <tbody>
                          {reports.map((r) => (
                            <ReportTd
                              sale={r}
                              key={r.id}
                              handleDetail={() => handleDetail(r.order.id)}
                            />
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>

                  <Pagination info={info ? info : null} />
                </div>
              </div>
            </div>
          </div>
        )}
      </ContainerFluid>
    </ContainerAdmin>
  );
};
export default reports;

function Filter({ handleChange }) {
  return (
    <div className="row mb-2">
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_length">
          <label>
            Mostrar Items
            <select
              name="limit"
              aria-controls="dataTable"
              className="custom-select custom-select-sm form-control form-control-sm mt-2"
              onChange={handleChange}
              // value={limit}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <label>Fecha de reporte</label>
        <input
          placeholder="selecciona tu fecha"
          name="date"
          type="date"
          onChange={handleChange}
          class="form-control"
        />
      </div>
    </div>
  );
}

function ReportTd({ sale, handleDetail }) {
  const { order } = sale;
  const { change, moneyReceived, paid, createdAt } = sale;
  return (
    <tr>
      <td>{`${order.orderNumber}`}</td>
      <td>{`${order.tableId.numMesa}`}</td>
      <td>{`${order.waiterId.name} ${order.waiterId.lastName}`}</td>
      <td>{`2 Mar 5:05 PM`}</td>
      <td>{`${order.totalQuantity}`}</td>
      <td>
        <span className={sale.paid ? "badge bg-success" : "badge bg-warning"}>
          {sale.paid ? "Pagado" : "Pendiente"}
        </span>
      </td>
      <td>{`$${order.total}`}</td>
      <td>{`$${sale.moneyReceived}`}</td>
      <td>{`$${sale.change}`}</td>
      <td className="text-center">
        <i
          title="ver detalles"
          class="fa-solid fa-eye cursor-pointer color-detail"
          onClick={handleDetail}
        />
      </td>
    </tr>
  );
}
