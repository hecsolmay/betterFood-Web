import React, { useState, useEffect } from "react";
import { Headers, ContainerAdmin, ContainerFluid, Row } from "../common";
import Table from "../components/tables/table";
import { cleanSale, getSales } from "../services/sales";

const sales = () => {
  const [sales, setSales] = useState([]);
  const [info, setInfo] = useState({});

  const handlesalesChange = (sales) => {
    setSales(sales);
  };

  useEffect(() => {
    getSales().then((res) => {
      if (res.status != 200) {
        return console.error("algo salio mal");
      }
      const { data } = res;
      setInfo(data.info);
      let sales = data.results.map((s) => cleanSale(s));
      setSales(sales);
      handlesalesChange(sales);
    });
  }, []);
  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Sales" />
        {sales.length !== 0 ? (
          <Table
            title="Tabla de Ventas"
            itemsTitle={Object.keys(sales[0])}
            items={sales}
            info={info}
          />
        ) : null}
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default sales;
