import React, { useEffect, useState } from "react";
import {
  ContainerAdmin,
  ContainerFluid,
  Headers,
  Loader,
  Row
} from "../../common";
import EarningsCard from "../../components/dashboard/earningsCard";
import { getDashboard } from "../../services/dashboard";
import BarChart from "./components/BarChart";
import Card from "./components/Card";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [earningData, setEarningData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    setError(false);
    setLoading(true);
    const res = await getDashboard();

    if (res.status === 200) {
      const { data } = res;
      setData(data.results);
      let earning = {
        labels: data.results.monthsRecaudationData.map((r) => r.month),
        datasets: [
          {
            label: "Ganancias Mensuales",
            data: data.results.monthsRecaudationData.map((r) => r.total),
            backgroundColor: ["green", "blue", "red", "yellow", "orange"],
          },
        ],
      };
      setEarningData(earning);
    } else {
      setError(true);
    }
    setLoading(false);
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Dashboard" />

        {error && (
          <div className={error ? "text-center mb-5 mt-5" : "d-none  "}>
            <h1>Ocurrio un error al traer los datos</h1>
            <button className="btn btn-primary" onClick={getData}>
              Recargar
            </button>
          </div>
        )}
        {loading ? (
          <div className="loader-dash">
            <Loader />
          </div>
        ) : (
          !error && (
            <>
              <Row>
                <EarningsCard
                  title="Ganancias (mensuales)"
                  quantity={`$${data.monthEarnings.total}`}
                  icon="fas fa-calendar fa-2x text-gray-300"
                />
                <EarningsCard
                  title="Ganancias (Anuales)"
                  quantity={`$${data.yearRecaudation.total}`}
                  icon="fas fa-dollar-sign fa-2x text-gray-300"
                  color="success"
                />
                <EarningsCard
                  title="Productos"
                  quantity={`${data.totalProducts}`}
                  icon="fas fa-clipboard-list fa-2x text-gray-300"
                  color="info"
                />
                <EarningsCard
                  title="Categorias"
                  quantity={`${data.totalCategories}`}
                  icon="fa-solid fa-list fa-2x text-gray-300"
                  color="warning"
                />
              </Row>
              <Row>
                <Card title="Grafica de ventas por mes" size="7">
                  <BarChart chartData={earningData} />
                </Card>
                <Card title="Listado de ventas" size="5">
                  <div className="mt-3">
                    <ul>
                      {data.monthsRecaudationData.map((r, index) => (
                        <li key={index}>
                          <span>{`${r.month}:`}</span>
                          <span className="ms-2">{`$${r.total.toFixed(
                            2,
                            0
                          )}`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Row>

              <Row>
                <Card title="Mesero del mes" image="img/waiterProfile.png">
                  <div className="text-center">
                    <h4>{data.monthWaiter.name}</h4>
                  </div>
                  <div className="text-center mt-4">
                    <p>{`Ventas del mes: ${data.monthWaiter.totalSales}`}</p>
                  </div>
                  <br />
                </Card>
                <Card
                  title="Producto Mas vendido"
                  image={data.topProduct.imgURL}
                >
                  <div className="text-center">
                    <h4>{data.topProduct.name}</h4>
                    <p className="mt-2">{data.topProduct.description}</p>
                    <strong>{`$${data.topProduct.price}`}</strong>
                  </div>
                </Card>
              </Row>
            </>
          )
        )}
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default Dashboard;
