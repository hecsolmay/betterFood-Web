import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../../common";
import { getSaleById, updateSale } from "../../../services/sales";

import "./shoppingList.css";

const ShoppingList = ({ items }) => {
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({});
  const navigate = useNavigate();

  const getData = async () => {
    const res = await getSaleById(id);
    if (res.status === 200) {
      const { results } = res.data;
      setSale(results);
    }
    setLoading(false);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const res = await updateSale(sale.id, body);
    if (res.status === 200) {
      navigate("/orders");
    }
  };

  const handleChange = (ev) => {
    setBody({ ...body, [ev.target.name]: ev.target.value });
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <div
          className="text-center"
          style={{ height: "300px", paddingTop: "100px" }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <LeftCard
            items={sale.order?.totalQuantity}
            products={sale.order?.products}
          />
          <div className="col-md-4 summary-shopping">
            <div>
              <h5>
                <b>Info</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col text-left">{`Mesa ${sale.order?.tableId.numMesa}`}</div>
              <div className="col text-right">{`Mesero: ${sale.order?.waiterId.name} ${sale.order?.waiterId.lastName}`}</div>
            </div>
            {!sale.paid && (
              <div
                className="row mt-2"
                style={{
                  borderTop: "1px solid rgba(0,0,0,.1)",
                  padding: "2vh 0",
                }}
              >
                <div className="col text-left">{`ITEMS ${sale.order?.totalQuantity}`}</div>
                <div className="col text-right">{`$ ${sale.order?.total.toFixed(
                  2
                )}`}</div>
              </div>
            )}
            {!sale?.paid && (
              <form
                className="form-shopping"
                id="payment"
                onSubmit={handleSubmit}
              >
                <p>INGRESA EL PAGO</p>
                <input
                  className="input-shopping"
                  placeholder="Ingresa el pago"
                  type="number"
                  name="moneyReceived"
                  onChange={handleChange}
                  required
                  min={sale.order?.total.toFixed(2)}
                />
              </form>
            )}
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col text-left">PRECIO TOTAL</div>
              <div className="col text-right">{`$ ${sale.order?.total.toFixed(
                2
              )}`}</div>
            </div>
            {sale.paid && (
              <div
                className="row"
                style={{
                  borderTop: "1px solid rgba(0,0,0,.1)",
                  padding: "2vh 0",
                }}
              >
                <div className="col text-left">Dinero Recibido</div>
                <div className="col text-right">{`$ ${sale.moneyReceived}`}</div>
              </div>
            )}
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col text-left">CAMBIO</div>
              <div className="col text-right">{`$ ${sale.change}`}</div>
            </div>
            {!sale.paid && (
              <button className="btn-shopping" type="submit" form="payment">
                PAGAR
              </button>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default ShoppingList;

const ListItem = ({ product, quantity, extras = [], remove = [] }) => {
  let price = product.price * quantity;
  if (extras.length !== 0) {
    for (let i = 0; i < extras.length; i++) {
      const el = extras[i];
      price += el.extraPrice * quantity;
    }
  }
  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-3">
          <img className="img-fluid" src={product.imgURL} />
        </div>
        <div className="col-2">
          <div className="row">{product.name}</div>
        </div>
        {extras.length !== 0 || remove.length !== 0 ? (
          <div className="col-4">
            {extras.length !== 0 && (
              <div className="text-center">
                <strong>Extras</strong>
                <ul className="mt-3">
                  {extras.map((e) => (
                    <li className="mt-1" key={e.id}>
                      <span className="me-3">{e.name}</span>
                      {`$${e.extraPrice.toFixed(2)}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {remove.length !== 0 && (
              <>
                <strong>Quitar</strong>
                <ul className="mt-3">
                  {remove.map((e) => (
                    <li className="mt-1" key={e.id}>
                      {e.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : null}
        <div className="col">{quantity}</div>
        <div className="col">{price}</div>
      </div>
    </div>
  );
};

const Container = ({ children }) => (
  <div className="d-flex align-items-center justify-content-center vh-100 vw-100 shopping">
    <div className="text-center">
      <div className="card-shopping">
        <div className="row">{children}</div>
      </div>
    </div>
  </div>
);

const LeftCard = ({ items = 10, products = [] }) => (
  <div className="col-md-8 cart-shopping">
    <div className="title-shopping">
      <div className="row">
        <div className="col text-left">
          <h4>
            <b>Detalles de venta</b>
          </h4>
        </div>
        <div className="col align-self-center text-right text-muted">
          {`${items} productos`}
        </div>
      </div>
    </div>
    <div className="scrolleable">
      {products.map((p) => (
        <ListItem
          key={p.id}
          product={p.product}
          quantity={p.quantity}
          extras={p.extras}
          remove={p.remove}
        />
      ))}
      {/* <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem /> */}
    </div>
    <div className="back-to-shop text-left mt-40">
      <Link to={"/orders"}>
        <button className="btn-sm btn-primary">Volver a las Ordenes</button>
      </Link>
    </div>
  </div>
);
