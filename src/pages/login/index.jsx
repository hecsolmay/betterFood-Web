import React, { useState } from "react";
import { Row } from "../../common";
import Container from "../../components/login/container";
import { Link, useNavigate } from "react-router-dom";
import { singin } from "../../services/users";
import { setItems, getTokenItem, getUser } from "../../utils/localStorage";
import { unauthorizedError } from "../../components/alerts";
import "./index.css";

const login = () => {
  const [form, setform] = useState({});
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await singin(form);
    if (res.status === 400) {
      var inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].blur();
      }
      setError(true);
    }

    const { data } = res;
    setError(false);
    setItems(data);

    if (data.user.rol.name === "admin") {
      return navigate("/dashboard");
    }

    unauthorizedError();

    let token = getTokenItem();
    let user = getUser();
  };
  return (
    <Container>
      {/* <!-- Nested Row within Card Body --> */}
      <div className="login-card">
        <Row>
          <div className="col-lg-6 d-none d-lg-block bg-login-image" />
          <div className="col-lg-6">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">¡Bienvenido de Nuevo!</h1>
              </div>
              <form
                className="user"
                onChange={handleChange}
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="email"
                    className={
                      error
                        ? "form-control form-control-user input-error f-none"
                        : "form-control form-control-user"
                    }
                    name="email"
                    placeholder="Ingresa tu correo..."
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      error
                        ? "form-control form-control-user input-error f-none"
                        : "form-control form-control-user"
                    }
                    placeholder="Contraseña"
                    name="password"
                    required
                  />
                  <div
                    className={
                      error
                        ? "ms-2 mt-4 text-center"
                        : "ms-2 mt-4 text-center d-none"
                    }
                  >
                    <p className="color-danger">
                      El correo o la contraseña es incorrecta
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-user btn-block"
                >
                  Iniciar Sesion
                </button>
                <hr />
                {/* <button className="btn btn-google btn-user btn-block">
                  <i className="fab fa-google fa-fw"></i> Iniciar Sesion con
                  Google
                </button> */}
              </form>
              <hr />
              <div className="text-center">
                <Link className="small" to="/forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="text-center">
                <Link className="small" to="/signup">
                  ¡Crea tu cuenta!
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </Container>
  );
};

export default login;
