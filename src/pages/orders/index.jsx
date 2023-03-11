import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SaleRow from "./components/saleRow";
import {
  Headers,
  ContainerAdmin,
  ContainerFluid,
  Pagination,
} from "../../common";
import Filter from "./components/Filter";
import NavTable from "./components/navTable";
import Table from "./components/table";
import * as services from "../../services/sales";
import "./index.css";
import {
  warningOrderAlert,
  warningOrderStatusAlert,
} from "../../components/alerts";

const OrdersPage = () => {
  const [sales, setSales] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  const getData = async () => {
    setLoading(true);

    const res = await services.getSales(params);
    if (res.status === 200) {
      console.log(res);
      const { data } = res;
      setSales(data.results);
      setInfo(data.info);
    }

    setLoading(false);
  };

  const handleDelete = (id) => {
    console.log(id);

    warningOrderAlert().then(async (res) => {
      if (res.isConfirmed) {
        const res = await services.updateOrder(id, { status: "cancelado" });
        console.log(res);
        getData();
      }
    });
  };

  const handleUpdate = async (id, status) => {
    console.log(id);
    console.log(status);

    warningOrderStatusAlert().then(async (response) => {
      if (response.isConfirmed) {
        const res = await services.updateOrder(id, { status });
        if (res.status === 200) getData();
      }
    });
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

            <Table>
              <thead>
                <tr>
                  <th className="cell">Orden</th>
                  <th className="cell">Mesero</th>
                  <th className="cell">N° Mesa</th>
                  <th className="cell">Fecha</th>
                  <th className="cell">Estatus</th>
                  <th className="cell">Cambiar Estatus</th>
                  <th className="cell">Total</th>
                  <th className="cell">Detalles</th>
                </tr>
              </thead>
              {sales.length !== 0 && (
                <tbody>
                  {sales.map((s) => (
                    <SaleRow
                      sale={s}
                      key={s.id}
                      handleDelete={() => handleDelete(s.order.id)}
                      handleUpdate={handleUpdate}
                    />
                  ))}
                </tbody>
              )}
            </Table>
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
