import React, { useState, useEffect } from "react";
import {
  Headers,
  ContainerAdmin,
  ContainerFluid,
  Row,
  Loader,
} from "../../common";
import * as services from "../../services/users";
import Table from "../../components/tables/table";
import { useSearchParams } from "react-router-dom";

const roles = () => {
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  const getData = async () => {
    try {
      setLoading(true);
      const data = await services.getUsers(params);
      console.log(data.results);
      setUsers(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Users" />
        <div className={error ? "text-center mb-5 mt-5" : "d-none  "}>
          <h1>Ocurrio un error al traer los datos</h1>
          <button className="btn btn-primary" onClick={getData}>
            Recargar
          </button>
        </div>

        {/* {users.length !== 0 ? (
          <Table
            title="Tabla de Usuarios"
            itemsTitle={Object.keys(users[0])}
            items={users}
            info={info}
          />
        ) : null} */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {!error && (
              <Table info={info} title="Lista de Usuarios">
                <thead>
                  <tr>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.rol.name}</td>
                      <td>{u.active === 1 ? "Si" : "No"}</td>
                      <td>Eliminar</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default roles;
