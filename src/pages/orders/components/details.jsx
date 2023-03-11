import { useContext } from "react";
import { Link } from "react-router-dom";
import { PreviousPageContext } from "../../../context/PageContext";

export const ListItem = ({ product, quantity, extras = [], remove = [] }) => {
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

export const Container = ({ children }) => (
  <div className="d-flex align-items-center justify-content-center vh-100 vw-100 shopping">
    <div className="text-center">
      <div className="card-shopping">
        <div className="row">{children}</div>
      </div>
    </div>
  </div>
);

export const LeftCard = ({ items = [], products = [] }) => {
  const { previousPage } = useContext(PreviousPageContext);

  return (
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
      </div>
      <div className="back-to-shop text-left mt-40">
        <Link to={previousPage || "/orders"}>
          <button className="btn-sm btn-primary">Volver a las Ordenes</button>
        </Link>
      </div>
    </div>
  );
};
