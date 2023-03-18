import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import { API_SOCKET_URL } from "../../../config";
import {
  ContainerAdmin,
  ContainerFluid,
  Headers,
  Pagination,
} from "../../common";
import {
  infoNewOrderAlert,
  warningOrderAlert,
  warningOrderStatusAlert,
} from "../../components/alerts";
import * as services from "../../services/sales";
import Filter from "./components/filter";
import NavTable from "./components/navTable";
import SaleRow from "./components/saleRow";
import Table from "./components/table";
import "./index.css";

const OrdersPage = () => {
  const [sales, setSales] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("");
  const [selected, setSelected] = useState("today");

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

  useEffect(() => {
    const socket = io(API_SOCKET_URL);
    socket.on("connect", () => {
      console.log("Connect to server");
      socket.emit("join", "63f804a8757fa73689a81958");
      console.log("join Emitido");
    });
    socket.on("newOrder", (newOrder) => {
      console.log("Escuchó la nueva orden");

      infoNewOrderAlert().then((res) => {
        if (res.isConfirmed) {
          console.log(newOrder);
          setInfo(newOrder.info);
          setSales(newOrder.results);
          resetParams();
        } else {
          console.log("No actualizo");
        }
      });
    });

    socket.on("newOrderWaiter", (data) => {
      console.log("se conecto");
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const resetParams = () => {
    params.delete("date");
    params.delete("status");
    params.delete("orderNumber");
    params.delete("page");
    setParams(params);
    setActiveTab("all");
    setSelected("today");
  };

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Orders" />
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <Filter selected={selected} setSelected={setSelected} />

            <NavTable activeTab={activeTab} setActiveTab={setActiveTab} />

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
