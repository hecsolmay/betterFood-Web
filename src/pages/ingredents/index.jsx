import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ContainerAdmin,
  ContainerFluid, Headers, Loader, Row
} from "../../common";
import { deleteAlert } from "../../components/alerts";
import Col from "../../components/col-xl-3";
import FormIngredent from "../../components/ingredents/form";
import Table from "../../components/tables/table";
import * as services from "../../services/ingredents";

const IngredentsPage = () => {
  const [ingredents, setIngredents] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [task, setTask] = useState(1); // Task 1 == Create / Tast 2 == Update
  const [params] = useSearchParams();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (task === 1) {
      const res = await services.createIngredent(form);
      if ((res.status === 200) | (res.status === 201)) {
        getData();
      }
    }

    if (task === 2) {
      let ingredentChange = {
        name: form.name,
      };
      const res = await services.updateIngredent({
        id: form.id,
        newIngredent: ingredentChange,
      });
      setTask(1);
      setForm({ name: "" });
      if ((res.status === 200) | (res.status === 201)) {
        getData();
      }
    }
  };

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await services.getIngredents(params.toString());
      setIngredents(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  const resetTask = () => {
    setTask(1);
  };
  const handleDelete = async ({ id, name, active }) => {
    deleteAlert(name, active === 1).then(async (response) => {
      if (response.isConfirmed) {
        const body = active === 1 ? { active: 0 } : { active: 1 };
        await services.updateIngredent({ id, newIngredent: body });
        getData();
      }
    });
  };

  const handleEdit = async (i) => {
    setTask(2);
    setForm({ id: i.id, name: i.name });
  };

  useEffect(() => {
    getData();
  }, [params]);

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
                        <th>Nombre</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredents.map((i) => (
                        <tr key={i.id}>
                          <td>{i.name}</td>
                          <td>{i.active === 1 ? "Si" : "No"}</td>
                          <td>
                            {i.active === 1 ? (
                              <>
                                <div className="ms-3">
                                  <i
                                    className="fa fa-pen-to-square cursor-pointer color-warning "
                                    onClick={() => handleEdit(i)}
                                  />
                                  <i
                                    className="fa-solid fa-trash cursor-pointer color-danger ms-3"
                                    onClick={() =>
                                      handleDelete({
                                        id: i.id,
                                        name: i.name,
                                        active: i.active,
                                      })
                                    }
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="ms-4">
                                <i
                                  className="fa fa-arrows-rotate cursor-pointer color-green"
                                  onClick={() =>
                                    handleDelete({
                                      id: i.id,
                                      name: i.name,
                                      active: i.active,
                                    })
                                  }
                                />
                              </div>
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
