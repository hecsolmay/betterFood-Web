import React, { useState, useEffect } from "react";
import { Headers, ContainerAdmin, ContainerFluid, Row } from "../../common";
import Table from "../../components/tables/table";

const OrdersPage = () => {
  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Orders" />
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default OrdersPage;
