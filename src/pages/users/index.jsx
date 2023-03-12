import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ContainerAdmin,
  ContainerFluid, Headers, Loader
} from "../../common";
import { deleteAlert, warningRolAlert } from "../../components/alerts";
import Table from "../../components/tables/table";
import * as services from "../../services/users";
import { getUser } from "../../utils/localStorage";

const roles = () => {
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  const user = getUser();

  const getData = async () => {
    try {
      setLoading(true);
      const data = await services.getUsers(params);
      setUsers(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  const getRoles = async () => {
    try {
      setLoading(true);
      const data = await services.getRoles();
      setRoles(data.results);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  const handleChangeRole = async (user, rol) => {
    const roleFound = roles.find((r) => r.name == rol);
    warningRolAlert(rol, user.username).then(async (res) => {
      if (res.isConfirmed) {
        const newUser = { rol: roleFound.id };
        await services.updateUser(user.id, newUser);
        getData();
      }
    });
  };

  const handleDelete = async (user, active) => {
    deleteAlert(user.username, active).then(async (res) => {
      if (res.isConfirmed) {
        const newActive = { active: !active };
        await services.updateUser(user.id, newActive);
        getData();
      }
    });
  };

  useEffect(() => {
    getRoles();
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
              <Table info={info} placeholder="nombre de usuario..." title="Lista de Usuarios">
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
                      <td className="text-center">
                        {u.active === 1 ? "Si" : "No"}
                      </td>
                      <td className="text-center">
                        <i
                          title="Admin"
                          className="fa-solid fa-user-tie cursor-pointer color-admin mt-3 mt-md-0 ms-3"
                          onClick={() => {
                            handleChangeRole(u, "admin");
                          }}
                        />
                        <i
                          title="Moderator"
                          className="fa-solid fa-user-pen cursor-pointer color-moderator mt-3 mt-md-0 ms-3"
                          onClick={() => {
                            handleChangeRole(u, "moderator");
                          }}
                        />
                        <i
                          title="User"
                          className="fa-solid fa-user-large cursor-pointer color-user mt-3 mt-md-0 ms-3"
                          onClick={() => {
                            handleChangeRole(u, "user");
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <i
                          title="Inhabilitar"
                          className={
                            u.active === 1
                              ? "fa-solid fa-trash cursor-pointer color-danger ms-3"
                              : "fa fa-arrows-rotate color-admin cursor-pointer ms-3"
                          }
                          onClick={() => {
                            handleDelete(u, u.active === 1);
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
