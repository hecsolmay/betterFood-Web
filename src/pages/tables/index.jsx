import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ContainerAdmin,
  ContainerFluid,
  Headers,
  Loader,
  Pagination,
  Row,
} from "../../common";
import Col from "../../components/col-xl-3";
import SelectItems from "../../components/tables/selectItems";
import * as services from "../../services/tables";
import { getTables } from "../../services/tables";
import { TableCard } from "./components";
import "./index.css";

const TablesPage = () => {
  const [form, setForm] = useState({});
  const [task, setTask] = useState(1);
  const [tables, setTables] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    task === 1
      ? await services.createTable(form)
      : await services.updateTable(form.id, form);

    getData();
    reset();
  };

  const handleDelete = async (table) => {
    const active = table.active === 1;
    const updatedTable = {
      ...table,
      active: !active,
    };

    await services.updateTable(table.id, updatedTable);
    const message = updatedTable.active
      ? `Mesa ${table.numMesa} habilitada`
      : `Mesa ${table.numMesa} deshabilitada`;
    alert(message);
    getData();
  };

  const getData = async () => {
    setLoading(true);
    try {
      const data = await getTables(params.toString());
      setTables(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const handleUpdate = (table) => {
    setTask(2);
    setForm(() => {
      return {
        ...table,
      };
    });
  };

  const handleDowload = async (taskQr = 1) => {
    if (taskQr === 1) {
      return await services.generateListQr();
    }

    await services.generateAllQr();
  };

  const handleDownloadId = async (id) => {
    await services.generateQrById(id);
  };

  useEffect(() => {
    getData();
  }, [params]);

  const reset = () => {
    setForm({});
    setTask(1);
  };
  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Tables" />
        <Row>
          <Col colSize="col-lg-4">
            <form className="row g-3" id="form" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="numMesa" className="form-label">
                  {"Numero de mesa"}
                </label>
                <input
                  id="numMesa"
                  type="number"
                  className="form-control"
                  name="numMesa"
                  required
                  onChange={handleChange}
                  value={form.numMesa || ""}
                />
                <label htmlFor="capacity" className="form-label mt-3">
                  {"Capacidad de la mesa"}
                </label>
                <input
                  id="capacity"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                  name="capacity"
                  required
                  min={0}
                  value={form.capacity || ""}
                />

                {task === 1 ? (
                  <button className="btn btn-small btn-primary mt-4">
                    {"Crear Mesa"}
                  </button>
                ) : (
                  <Row>
                    <div className="col-sm-8">
                      <button className="btn btn-small btn-warning mt-4">
                        {"Actualizar Mesa"}
                      </button>
                    </div>
                    <div className="col-sm-4">
                      <button
                        className="btn btn-small btn-dark mt-4"
                        onClick={reset}
                      >
                        Cerrar
                      </button>
                    </div>
                  </Row>
                )}
              </div>
            </form>
          </Col>
          <Col className="min-heigth-300">
            <Row>
              <SelectItems limit={info.limit} search={false} />
              <Row>
                <div className="col-sm-12 col-md-4 mt-4 mb-4">
                  <button
                    className="btn btn-large btn-primary"
                    onClick={handleDowload}
                  >
                    Qrs de la pagina
                  </button>
                </div>
                <div className="col-sm-12 col-md-5 mt-4 mb-4">
                  <button
                    className="btn btn-large btn-primary"
                    onClick={async () => await handleDowload(2)}
                  >
                    Generar Todos los Qrs{" "}
                  </button>
                </div>
              </Row>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {tables.map((table) => (
                    <TableCard
                      key={table.id}
                      handleUpdate={() => handleUpdate(table)}
                      data={table}
                      handleDownloadId={async () => handleDownloadId(table.id)}
                      handleDelete={async () => handleDelete(table)}
                    />
                  ))}
                </>
              )}
              <Pagination info={info} />
            </Row>
          </Col>
        </Row>
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default TablesPage;
