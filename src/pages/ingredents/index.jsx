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
import FormIngredent from "../../components/ingredents/form";
import * as services from "../../services/ingredents";

const IngredentsPage = () => {
  const [ingredents, setIngredents] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [task, setTask] = useState(1); // Task 1 == Create / Tast 2 == Update

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (task === 1) {
      console.log("Subiendo formulario...");
      await services.createIngredent(form);
      alert("creado con exito");
    }

    if (task === 2) {
      console.log("editando entidad");
      let ingredentChange = {
        name: form.name,
      };
      await services.updateIngredent({
        id: form.id,
        newIngredent: ingredentChange,
      });
      alert("Actualizado con exito");
      setTask(1);
      setForm({ name: "" });
    }
    getData();
  };

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await services.getIngredents();
      console.log(data);
      setIngredents(data.results);
      setInfo(data.info);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

  const resetTask = () => {
    setTask(1);
  };
  const handleDelete = async ({ id, name, active }) => {
    let status = active === 1 ? 0 : 1;
    const body = {
      active: status,
    };
    await services.updateIngredent({ id, newIngredent: body });
    alert(`Cambiado el estado de ${name}`);
    getData();
  };

  const handleEdit = async (i) => {
    console.log(i);
    setTask(2);
    setForm({ id: i.id, name: i.name });
    // await services.updateIngredent({id: i.id})
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Ingredents" />
        <Row>
          <Col colSize="col-lg-4">
            <FormIngredent
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              name={form.name}
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
                  <Table info={info} title="Ingredientes">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredents.map((i) => (
                        <tr key={i.id}>
                          <td>{i.id}</td>
                          <td>{i.name}</td>
                          <td>{i.active === 1 ? "Si" : "No"}</td>
                          <td>
                            {i.active === 1 ? (
                              <>
                                <button
                                  className="btn btn-sm btn-warning btn-addon ms-3"
                                  onClick={() => handleEdit(i)}
                                >
                                  <i className="fa fa-pen-to-square" />
                                </button>
                                <button
                                  className="btn btn-sm btn-danger btn-addon ms-3"
                                  onClick={() =>
                                    handleDelete({
                                      id: i.id,
                                      name: i.name,
                                      active: i.active,
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
                                    id: i.id,
                                    name: i.name,
                                    active: i.active,
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

export default IngredentsPage;