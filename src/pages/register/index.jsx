import React, { useState } from "react";
import { Row } from "../../common";
import Container from "../../components/login/container";
import { Link } from "react-router-dom";
import { signup } from "../../services/users";
import { getTokenItem, getUser, setItems } from "../../utils/localStorage";

const register = () => {
  const [form, setform] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (ev) => {
    setform({ ...form, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(form);

    const { apellido, nombre, email, password, repeatPassword } = form;

    if (repeatPassword !== password)
      return setError(true);

    const user = {
      username: nombre + " " + apellido,
      email,
      password,
    };

    signup(user).then((res) => {
      if (res.status != 200) {
        return console.log("fallo algo");
      }

      const { data } = res;
      setItems(data);

      navigate("/dashboard");

      let token = getTokenItem();
      let user = getUser();

      console.log(token);
      console.log(user);
    });

    console.log(user);
  };

  return (
    <Container>
      {/* <!-- Nested Row within Card Body --> */}
      <Row>
        <div className="col-lg-5 d-none d-lg-block bg-register-image" />
        <div className="col-lg-7">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">¡Crea tu Cuenta!</h1>
            </div>
            <form
              className="user"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <div className="form-group row mb-3">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Nombre"
                    name="nombre"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Apellido"
                    name="apellido"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="col-sm-12 mb-6 mb-sm-0">
                  <input
                    type="email"
                    className="form-control form-control-user"
                    name="email"
                    placeholder="Correo Electronico"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                {error && (
                  <div className="col-sm-12 mb-6 mb-sm-0">
                    <p className="color-danger">
                      Error las contraseñas no son las mismas
                    </p>
                  </div>
                )}
                <div className="col-sm-6 mb-3 mb-sm-4">
                  <input
                    type="password"
                    className={
                      error
                        ? "form-control form-control-user border-red"
                        : "form-control form-control-user"
                    }
                    placeholder="contraseña"
                    name="password"
                    required
                  />
                </div>
                <div className="col-sm-6 mb-3 mb-sm-4">
                  <input
                    type="password"
                    className={
                      error
                        ? "form-control form-control-user border-red"
                        : "form-control form-control-user"
                    }
                    name="repeatPassword"
                    placeholder="Repite tu contraseña"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-user btn-block"
              >
                Register Account
              </button>
              <hr />
              {/* <button
                href="index.html"
                className="btn btn-google btn-user btn-block"
              >
                <i className="fab fa-google fa-fw"></i> Register with Google
              </button> */}
            </form>
            <hr />

            <div className="text-center">
              <Link className="small" to="/login">
                Already have an account? Login!
              </Link>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};
export default register;
