import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ContainerAdmin,
  ContainerFluid, Headers, Loader,
  Pagination
} from "../../common";
import { getReports } from "../../services/sales";
import Container from "./components/container";
import Filter from "./components/filter";
import { Table, Td, Thead } from "./components/table";

const reports = () => {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reports, setReports] = useState([]);
  const [info, setInfo] = useState({});

  const getData = async () => {
    setLoading(true);
    const res = await getReports(params.toString());
    setLoading(false);
    if (res.status === 200) {
      const { data } = res;
      setReports(data.results);
      setInfo(data.info);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Reportes" />
        {loading ? (
          <Loader />
        ) : (
          <Container>
            <Filter />
            <Table>
              <Thead />
              {reports.length !== 0 && (
                <tbody>
                  {reports.map((r) => (
                    <Td sale={r} key={r.id} orderId={r.id} />
                  ))}
                </tbody>
              )}
            </Table>

            <Pagination info={info ? info : null} />
          </Container>
        )}
      </ContainerFluid>
    </ContainerAdmin>
  );
};
export default reports;
