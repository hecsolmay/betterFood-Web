import React, { useState } from "react";
import { Row } from "../common";
import Container from "../components/login/container";
import { Link, useNavigate } from "react-router-dom";
import { singin } from "../services/users";
import { setItems, getTokenItem, getUser } from "../utils/localStorage";

const login = () => {
  const [form, setform] = useState({});
  let navigate = useNavigate();
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    singin(form).then((res) => {
      if (res.status != 200) {
        return console.log("fallo algo");
      }

      const { data } = res;
      console.log(data);
      setItems(data);

      navigate("/dashboard");

      let token = getTokenItem();
      let user = getUser();

      console.log(token);
      console.log(user);
    });
  };
  return (
    <Container>
      {/* <!-- Nested Row within Card Body --> */}
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
                  className="form-control form-control-user"
                  name="email"
                  placeholder="Ingresa tu correo..."
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-user"
                  placeholder="Contraseña"
                  name="password"
                  required
                />
              </div>
              {/* <div className="form-group">
                <div className="custom-control custom-checkbox small">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck"
                  />
                  <label className="custom-control-label" htmlFor="customCheck">
                    Remember Me
                  </label>
                </div>
              </div> */}
              <button
                type="submit"
                className="btn btn-primary btn-user btn-block"
              >
                Iniciar Sesion
              </button>
              <hr />
              <button className="btn btn-google btn-user btn-block">
                <i className="fab fa-google fa-fw"></i> Iniciar Sesion con
                Google
              </button>
            </form>
            <hr />
            <div className="text-center">
              <Link className="small" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center">
              <Link className="small" to="/signup">
                Create an Account!
              </Link>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default login;
