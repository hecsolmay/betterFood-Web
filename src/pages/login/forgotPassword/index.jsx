import React from "react";
import { Link } from "react-router-dom";
import { Row } from "../../../common";

const forgotPassword = () => {
  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log("Mandando form");
  }
  return (
    <div
      className="bg-gradient-dark"
      style={{ paddingTop: "50px", minHeight: "100vh" }}
    >
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <Row>
                  <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">
                          ¿Olvidaste tu contraseña?
                        </h1>
                        <p className="mb-4 mt-3">
                          Por favor ingresa el correo electronico con el que te
                          registraste y te mandaremos un link para reiniciar tu
                          contraseña
                        </p>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            placeholder="Ingresa tu Email..." />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                          Reiniciar contraseña
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" to="/login">
                          Volver al inicio de sesion!
                        </Link>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgotPassword;
