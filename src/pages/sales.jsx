import React, { useState, useEffect } from "react";
import { Headers, ContainerAdmin, ContainerFluid, Row } from "../common";
import Table from "../components/tables/table";

const sales = () => {
  const [sales, setSales] = useState([]);
  const [info, setInfo] = useState({});

  const handlesalesChange = (sales) => {
    setSales(sales);
  };

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Sales" />
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default sales;
