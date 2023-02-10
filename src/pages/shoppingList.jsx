import React from "react";
import { Link } from "react-router-dom";

import "../styles/shoppingList.css";
import { ContainerAdmin, ContainerFluid } from "../common";

const ShoppingList = () => {
  return (
    <Container>
      <LeftCard />
      <div className="col-md-4 summary-shopping">
        <div>
          <h5>
            <b>Total</b>
          </h5>
        </div>
        <hr />
        <div className="row">
          <div className="col text-left">ITEMS 3</div>
          <div className="col text-right">$132.00</div>
        </div>
        <form className="form-shopping">
          <p>INGRESA EL PAGO</p>
          <input
            className="input-shopping"
            placeholder="Ingresa el pago"
            type="number"
            min={0}
          />
        </form>
        <div
          className="row"
          style={{
            borderTop: "1px solid rgba(0,0,0,.1)",
            padding: "2vh 0",
          }}
        >
          <div className="col text-left">PRECIO TOTAL</div>
          <div className="col text-right">$ 137.00</div>
        </div>
        <div
          className="row"
          style={{
            borderTop: "1px solid rgba(0,0,0,.1)",
            padding: "2vh 0",
          }}
        >
          <div className="col text-left">CAMBIO</div>
          <div className="col text-right">$ 0.00</div>
        </div>
        <button className="btn-shopping">CHECKOUT</button>
      </div>
    </Container>
  );
};

export default ShoppingList;

const ListItem = () => (
  <div className="row border-top border-bottom">
    <div className="row main align-items-center">
      <div className="col-2">
        <img
          className="img-fluid"
          src="https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813_1280.jpg"
        />
      </div>
      <div className="col">
        <div className="row">Cotton T-shirt</div>
      </div>
      <div className="col">3</div>
      <div className="col">44.00</div>
    </div>
  </div>
);

const Container = ({ children }) => (
  <div className="d-flex align-items-center justify-content-center vh-100 vw-100 shopping">
    <div className="text-center">
      <div className="card-shopping">
        <div className="row">{children}</div>
      </div>
    </div>
  </div>
);

const LeftCard = ({ children }) => (
  <div className="col-md-8 cart-shopping">
    <div className="title-shopping">
      <div className="row">
        <div className="col text-left">
          <h4>
            <b>Shopping Cart</b>
          </h4>
        </div>
        <div className="col align-self-center text-right text-muted">
          3 items
        </div>
      </div>
    </div>
    <div className="scrolleable">
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
    <div className="back-to-shop text-left mt-40">
      <button className="btn-sm btn-primary">
        <Link to="/sales" className="text-white ref-none">Back to shop</Link>
      </button>
      {/* <span className="text-muted">Back to shop</span> */}
    </div>
  </div>
);
