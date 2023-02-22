import React, { useState, useEffect } from "react";
import { Headers, ContainerAdmin, ContainerFluid, Row } from "../../common";
import { getUsers } from "../../services/users";
import Table from "../../components/tables/table";

const roles = () => {
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState({});

  const handleUsersChange = (users) => {
    setUsers(users);
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res.status != 200) {
        return console.error("algo salio mal");
      }
      const { data } = res;
      setInfo(data.info);
      let users = data.results.map((c) => cleanUser(c));
      setUsers(users);
      handleUsersChange(users);
    });
  }, []);
  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Roles" />
        {users.length !== 0 ? (
          <Table
            title="Tabla de Usuarios"
            itemsTitle={Object.keys(users[0])}
            items={users}
            info={info}
          />
        ) : null}
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default roles;
