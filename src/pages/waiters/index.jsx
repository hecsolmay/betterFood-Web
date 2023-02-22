import React, { useState, useEffect } from "react";
import {
  Headers,
  ContainerAdmin,
  ContainerFluid,
  Row,
  Loader,
} from "../../common";
import Col from "../../components/col-xl-3";
import Table from "../../components/tables/table";
import FormWaiter from "../../components/waiters/form";
import * as services from "../../services/waiters";

const WaitersPage = () => {
  const [waiters, setWaiters] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [task, setTask] = useState(1); // Task 1 == Create / Tast 2 == Update

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (task === 1) {
      console.log("Subiendo formulario...");
      await services.createWaiter(form);
      alert("creado con exito");
    }

    if (task === 2) {
      console.log("editando entidad");
      const waiterChage = {
        name: form.name,
        lastName: form.lastName,
        birthdate: form.birthdate,
      };
      await services.updateWaiter({
        id: form.id,
        newWaiter: waiterChage,
      });
      alert("Actualizado con exito");
      setTask(1);
      resetTask()
    }
    getData();
  };

  const handleChange = (ev) => {
    console.log(ev.target.value);
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await services.getWaiters();
      console.log(data);
      setWaiters(data.results);
      setInfo(data.info);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

  const resetTask = () => {
    setTask(1);
    setForm({});
    setForm({ name: "", lastName: "", birthdate: "" });
  };
  const handleDelete = async ({ id, name, active }) => {
    let status = active === 1 ? 0 : 1;
    const body = {
      active: status,
    };
    await services.updateWaiter({ id, newWaiter: body });
    alert(`Cambiado el estado de ${name}`);
    getData();
  };

  const handleEdit = async (w) => {
    console.log(w);
    setTask(2);
    let birthdate = new Date(w.birthdate).toLocaleDateString().split("/");
    console.log(birthdate);
    birthdate[1] =
      birthdate[1].length === 2 ? birthdate[1] : `0${birthdate[1]}`;
    birthdate[0] =
      birthdate[0].length === 2 ? birthdate[0] : `0${birthdate[1]}`;
    birthdate = birthdate.reverse().join("-");
    console.log(birthdate);
    setForm({ id: w.id, name: w.name, lastName: w.lastName, birthdate });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="waiters" />
        <Row>
          <Col colSize="col-lg-4">
            <FormWaiter
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              name={form.name}
              lastName={form.lastName}
              birthdate={form.birthdate}
              task={task}
              resetTask={resetTask}
            />
          </Col>
          <Col>
            <div className={error ? "text-center mb-5 mt-5" : "d-none  "}>
              <h1>Ocurrio un error al traer los datos</h1>
              <button className="btn btn-primary" onClick={getData}>
                Recargar
              </button>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                {!error && (
                  <Table info={info} title="Waiter">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waiters.map((w) => (
                        <tr key={w.id}>
                          <td>{w.id}</td>
                          <td>{w.name}</td>
                          <td>{w.lastName}</td>
                          <td>{new Date(w.birthdate).toLocaleDateString()}</td>
                          <td>{w.active === 1 ? "Si" : "No"}</td>
                          <td>
                            {w.active === 1 ? (
                              <>
                                <button
                                  className="btn btn-sm btn-warning btn-addon mb-2 ms-3"
                                  onClick={() => handleEdit(w)}
                                >
                                  <i className="fa fa-pen-to-square" />
                                </button>
                                <button
                                  className="btn btn-sm btn-danger btn-addon ms-3"
                                  onClick={() =>
                                    handleDelete({
                                      id: w.id,
                                      name: w.name,
                                      active: w.active,
                                    })
                                  }
                                >
                                  <i className="fa-solid fa-trash" />
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn btn-sm btn-primary btn-addon ms-3"
                                onClick={() =>
                                  handleDelete({
                                    id: w.id,
                                    name: w.name,
                                    active: w.active,
                                  })
                                }
                              >
                                <i class="fa fa-arrows-rotate"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </>
            )}
          </Col>
        </Row>
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default WaitersPage;
