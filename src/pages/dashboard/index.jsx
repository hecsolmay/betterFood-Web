import React from "react";
import { Headers, ContainerAdmin, ContainerFluid, Row } from "../../common";
import EarningsCard from "../../components/dashboard/earningsCard";

const cardDetails = [];

const dashboard = () => (
  <ContainerAdmin>
    <ContainerFluid>
      <Headers title="Dashboard" />

      <Row>
        <EarningsCard
          title="Ganancias (mensuales)"
          quantity="$40,000"
          icon="fas fa-calendar fa-2x text-gray-300"
        />
        <EarningsCard
          title="Ganancias (Anuales)"
          quantity=" $215,000"
          icon="fas fa-dollar-sign fa-2x text-gray-300"
          color="success"
        />
        <EarningsCard
          title="Productos"
          quantity="11"
          icon="fas fa-clipboard-list fa-2x text-gray-300"
          color="info"
        />
        <EarningsCard
          title="Categorias"
          quantity="12"
          icon="fas fa-comments fa-2x text-gray-300"
          color="warning"
        />
      </Row>

      <Row>
        <div className="col-lg-6 mb-4">
          {/* <!-- Product Card --> */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Product Card
              </h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                <img
                  className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                  style={{ width: "25rem" }}
                  src="img/undraw_posting_photo.svg"
                  alt="..."
                />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
                sint quaerat repellat tenetur, ex, nihil deleniti iste voluptas
                corrupti cumque nostrum cum reiciendis alias sequi possimus
                perferendis debitis necessitatibus aperiam!
              </p>
            </div>
          </div>
        </div>
        {/* <!-- Info Card --> */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Development Approach
              </h6>
            </div>
            <div className="card-body">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis unde iste nostrum cumque repellat ad quia commodi
                iusto adipisci architecto. Provident alias repudiandae sed
                dolore eius? Adipisci sed id libero?
              </p>
            </div>
          </div>
        </div>
      </Row>
    </ContainerFluid>
  </ContainerAdmin>
);

export default dashboard;
