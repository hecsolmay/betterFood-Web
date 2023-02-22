import React, { useState, useEffect } from "react";
import { Headers, ContainerAdmin, ContainerFluid, Row } from "../../common";
import Table from "../../components/tables/table";
import { Loader } from "../../common";
import { getTables } from "../../services/tables";
import Col from "../../components/col-xl-3";
import { createTable } from "../../services/tables";
import { TableCard } from "./components";
import "./index.css";

const TablesPage = () => {
  const [form, setForm] = useState({});
  const [task, setTask] = useState(1);
  const [tables, setTables] = useState([]);
  const [info, setInfo] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    createTable(form);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const data = await getTables();
      console.log(data);
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

  const handleUpdate = (id = 1) => {
    setId(id);
    setTask(2);
  };

  useEffect(() => {
    getData();
  }, []);

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
                />

                {task === 1 ? (
                  <button className="btn btn-small btn-primary mt-4">
                    {"Crear Mesa"}
                  </button>
                ) : (
                  <>
                    <label htmlFor="active" className="form-label mt-3">
                      {"Estado"}
                    </label>
                    <input
                      id="active"
                      type="checkbox"
                      // className="form-control"
                      onChange={handleChange}
                      name="active"
                      required
                    />
                    <label htmlFor="waiterId" className="form-label mt-3">
                      {"Mesero"}
                    </label>
                    <select name="waiterId" id="waiterId">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
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
                  </>
                )}
              </div>
            </form>
          </Col>
          <Col>
            <Row>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {tables.map((table) => (
                    <TableCard
                      key={table.id}
                      handleUpdate={handleUpdate}
                      data={table}
                    />
                  ))}
                </>
              )}
            </Row>
          </Col>
        </Row>
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default TablesPage;
