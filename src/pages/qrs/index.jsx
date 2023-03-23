import React, { useEffect, useState } from "react";
import { ContainerAdmin, ContainerFluid, Headers, Row } from "../../common";
import { getTables } from "../../services/tables";
import { getWaiters } from "../../services/waiters";
import Card from "./components/card";
import QRCode from "qrcode.react";

const QrsPage = () => {
  const [waiters, setWaiters] = useState([]);
  const [infoWaiter, setInfoWaiter] = useState({});
  const [task, setTask] = useState(1); // Task 1: select waiter, Task 2: select Table
  const [tables, setTables] = useState([]);
  const [infoTable, setInfoTable] = useState({});
  const [data, setData] = useState({ waiterId: "", tableId: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dataWaiters = await getWaiters();
      console.log(dataWaiters);
      const dataTables = await getTables();
      console.log(dataTables);
      setWaiters(dataWaiters.results);
      setInfoWaiter(dataWaiters.info);
      setTables(dataTables.results);
      setInfoTable(dataTables.info);
    } catch (error) {
      setError(true);
    }
  };

  const handleClickWaiter = (id) => {
    data.waiterId = id;
    console.log(id);
    setTask(2);
  };

  const handleClickTable = (id) => {
    data.tableId = id;
    console.log(id);
    setTask(3);
  };

  const resetData = () => {
    setTask(1);
    data.tableId = "";
    data.waiterId = "";
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const waiter = waiters.find((w) => w.id == data.waiterId);
  const table = tables.find((t) => t.id == data.tableId);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Generar Qrs" />
        <Row>
          {task === 1 &&
            waiters.map((w) => (
              <Card
                title={`Mesero`}
                handleClick={() => handleClickWaiter(w.id)}
              >
                <div className="text-center mt-4">
                  <p>{`Mesero: ${w.name} ${w.lastName}`}</p>
                </div>
              </Card>
            ))}
          {task === 2 &&
            tables.map((t) => (
              <Card
                title={`Mesa`}
                handleClick={() => handleClickTable(t.id)}
                image="img/restauran-table.jpg"
              >
                <div className="text-center mt-4">
                  <p>{`Numero de mesa: ${t.numMesa}`}</p>
                </div>
              </Card>
            ))}

          {task === 3 && (
            <div className="text-center mt-5">
              <div>
                <QRCode size={250} value={JSON.stringify(data)} />
              </div>
              <div className="mt-3">{`El mesero ${waiter.name} ${waiter.lastName} atiende la mesa ${table.numMesa}`}</div>
              <button
                className="btn btn-small btn-primary mt-3"
                onClick={resetData}
              >
                Reiniciar
              </button>
            </div>
          )}
        </Row>
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default QrsPage;
