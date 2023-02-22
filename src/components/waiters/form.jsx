import React from "react";
import { Row } from "../../common";

const FormWaiters = ({ handleChange, handleSubmit, name,lastName,birthdate, task = 1, resetTask }) => {
  return (
    <form className="row g-3" id="form" onSubmit={handleSubmit}>
      <div className="col-md-12">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          required
          onChange={handleChange}
          value={name}
        />
        <label htmlFor="name" className="form-label mt-2">
          Apellido
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          required
          onChange={handleChange}
          value={lastName}
        />
        <label htmlFor="name" className="form-label mt-2">
          {"Fecha de nacimiento"}
        </label>
        <input
          type="date"
          className="form-control"
          // id="name"
          onChange={handleChange}
          name="birthdate"
          value={birthdate}
          required
          // onChange={handleChange}
          // value={name}
        />
      </div>

      {task === 1 ? (
        <button className="btn btn-small btn-primary mt-4">
          Crear Ingrediente
        </button>
      ) : (
        <Row>
          <div className="col-sm-8">
            <button className="btn btn-small btn-warning mt-4">
              Actualizar Ingrediente
            </button>
          </div>
          <div className="col-sm-4">
            <button className="btn btn-small btn-dark mt-4" onClick={resetTask}>Cerrar</button>
          </div>
        </Row>
      )}
    </form>
  );
};

export default FormWaiters;
