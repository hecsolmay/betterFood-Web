import React from "react";
import { Row } from "../../common";

const FormIngredent = ({ handleChange, handleSubmit, name, task = 1, resetTask }) => {
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

export default FormIngredent;
