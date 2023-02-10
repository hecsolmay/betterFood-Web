import React from "react";

const AccountDetails = ({user}) => {
  return (
    <div className="col-xl-8">
      {/* <!-- Account details card--> */}
      <div className="card mb-4">
        <div className="card-header">Detalles de la cuenta</div>
        <div className="card-body">
          <form>
            {/* <!-- Form Group (username)--> */}
            <div className="mb-3">
              <label className="small mb-1" for="inputUsername">
                Nombre de usuario
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                name="username"
                value={user.username}
              />
            </div>

            {/* <!-- Form Group (email address)--> */}
            <div className="mb-3">
              <label className="small mb-1" for="inputEmailAddress">
                Direccion de correo
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="Ingresa tu correo electronico"
                value={user.email}
              />
            </div>
            {/* <!-- Form Row--> */}
            <div className="row gx-3 mb-3">
              {/* <!-- Form Group (phone number)--> */}
              <div className="col-md-6">
                <label className="small mb-1" for="inputPhone">
                  Cambiar Contraseña
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  name="password"
                />
              </div>
              {/* <!-- Form Group (birthday)--> */}
              <div className="col-md-6">
                <label className="small mb-1" for="inputBirthday">
                  Antigua Contraseña
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="oldPassword"
                  placeholder="Ingresa tu antigua contraseña"
                />
              </div>
            </div>
            {/* <!-- Save changes button--> */}
            <button className="btn btn-primary" type="button">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
