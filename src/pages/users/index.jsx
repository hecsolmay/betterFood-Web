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
        {loading ? (
          <Loader />
        ) : (
          <>
            {!error && (
              <Table info={info} title="Lista de Usuarios">
                <thead>
                  <tr>
                    <th className="text-center">UserName</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Rol</th>
                    <th className="text-center">Activo</th>
                    <th className="text-center">Cambiar Rol</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="text-center">{u.username}</td>
                      <td className="text-center">{u.email}</td>
                      <td className="text-center">{u.rol.name}</td>
                      <td className="text-center">{u.active === 1 ? "Si" : "No"}</td>
                      <td className="text-center">
                        <i
                          title="Admin"
                          className="fa-solid fa-user-tie cursor-pointer color-admin mt-3 mt-md-0 ms-3"
                          onClick={() => {
                            alert("Rol Subido");
                          }}
                        />
                        <i
                          title="Moderator"
                          className="fa-solid fa-user-pen cursor-pointer color-moderator mt-3 mt-md-0 ms-3"
                          onClick={() => {
                            alert("Rol Mas bajo");
                          }}
                        />
                        <i
                          title="User"
                          className="fa-solid fa-user-large cursor-pointer color-user mt-3 mt-md-0 ms-3"
                          onClick={() => {
                            alert("Rol Mas bajo");
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <i
                          title="Inhabilitar"
                          className="fa-solid fa-trash cursor-pointer color-danger ms-3"
                          onClick={() => {
                            alert("Button Pressed");
                          }}
                        />
                      </td>
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
